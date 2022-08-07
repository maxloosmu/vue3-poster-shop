var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var fs = require("fs");
var expressHandlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const catNames = require('cat-names')

var https = require('https');
var privkey = '/etc/letsencrypt/live/cclaw.legalese.com/privkey.pem';
var seccert = '/etc/letsencrypt/live/cclaw.legalese.com/cert.pem';

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

var directory;
fs.readFile("./directory.json", "utf8", function(err, data) {
	console.log(data.substring(0, 50));
	directory = JSON.parse(data);
	console.log(directory[0]);
	if (err) {
		throw err;
	}
});

app.get("/search", function(req, res) {
	console.log(req.query);
	var results = directory.reduce(function(acc, file) {
		if (file.tags.indexOf(req.query.q) !== -1) {
			acc.push({
				id: file.id,
				title: file.title,
			  thumb: "/public/images/".concat(file.thumb),
		    price: file.price
		  });
	  }
	  return acc;
 	}, []);
	res.send(results);
});

app.get('/headers', (req, res) => {
  res.type('text/plain')
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
  res.send(headers.join('\n'))
})
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');
app.get('/about', (req, res) => {
  res.render('about');
})
// the following is needed for cookie support
app.use(cookieParser())
// the following is needed for session support
app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' }))
app.get('/greeting', (req, res) => {
  res.render('greeting', {
    message: 'Hello esteemed programmer!',
    style: req.query.style,
		userid: req.cookies.userid,
    username: req.session.username
  })
})
app.get('/set-random-userid', (req, res) => {
  res.cookie('userid', (Math.random()*10000).toFixed(0))
  res.redirect('/greeting')
})
app.get('/set-random-username', (req, res) => {
  req.session.username = catNames.random()
  res.redirect('/greeting')
})

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/public", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV !== "production") {
	require("reload")(app);
}

var port = process.env.PORT || 8050;
var port2 = process.env.PORT || 8060;
server.listen(port, function () {
	console.log("Listening on port ".concat(port));
});
if (!fs.existsSync(privkey)) {
	console.log("privkey not found");
}
else {
  var options = {
	  key: fs.readFileSync(privkey),
	  cert: fs.readFileSync(seccert)
  };
  server2 = https.createServer(options, app);
  server2.listen(port2, function () {
		console.log("Listening on port ".concat(port2));
	});
}
