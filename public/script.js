let watcher;

Vue.createApp({
	data() {
		return {
			total: 0,
			cart: [],
			search: "orange",
			lastSearch: "",
			loading: false,
			results: [],
			listLength: 0
		};
	},
	computed: {
		products () {
			return this.results.slice(0, this.listLength);
		}
	},
	methods: {
		addToCart(product) {
			this.total += product.price;
			const item = this.cart.find(item => item.id === product.id);
			if (item) {
				item.qty++;
			} else {
				this.cart.push({
					id: product.id,
					title: product.title,
					price: product.price,
					qty: 1
				});
			}
		},
		currency(price) {
			return "$".concat(price.toFixed(2));
		},
		inc(item) {
			item.qty++;
			this.total += item.price;
		},
		dec(item) {
			item.qty--;
			this.total -= item.price;
			if (item.qty <= 0) {
				const i = this.cart.indexOf(item);
				this.cart.splice(i, 1);
			}
		},
		onSubmit() {
			this.results = [];
			this.listLength = 0;
			this.loading = true;
			setTimeout(() => this.delayFetch(), 2000);
		},
		appendResults() {
			if (this.listLength < this.results.length) {
				this.listLength += 4;
			}
		},
		delayFetch() {
			fetch("/search?q=".concat(this.search))
				.then(response => response.json())
				.then(body => {
					this.lastSearch = this.search;
					this.results = body;
					this.appendResults();
					this.loading = false;
				});
			console.log("Waited 3s");	
		}
	},
	created() {
		this.onSubmit();
	},
	updated() {
		const sensor = document.querySelector("#product-list-bottom");
		watcher = scrollMonitor.create(sensor);
		watcher.enterViewport(this.appendResults);
	},
	beforeUpdate() {
		if (watcher) {
			watcher.destroy();
			watcher = null;
		}
	}
}).mount("#app");
