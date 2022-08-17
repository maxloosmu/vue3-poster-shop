const express = require('express')
const app = express()
var url

app.use((req, res, next) => {
	url = req.protocol + '://' + req.get('host') + req.originalUrl
	console.log(`processing request for ${url}....`)
	next()
})

app.use((req, res, next) => {
	console.log('terminating request')
	res.send(`thanks for testing at ${url}!`)	
	// note that we do NOT call next() here...this terminates the request
})

app.use((req, res, next) => {
	console.log(`whoops, i'll never get called!`)
})

const port = process.env.PORT || 8055
app.listen(port, () => console.log( `Express started on http://localhost:${port}` +
  '; press Ctrl-C to terminate.'))

  