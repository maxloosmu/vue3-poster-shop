let watcher;

Vue.createApp({
	data() {
		return {
			total: 0,
			cart: [],
			search: "cat",
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
			let found = false;
			for (let i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === product.id) {
					found = true;
					this.cart[i].qty++;
				}
			}
			if (!found) {
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
			fetch("/search?q=".concat(this.search))
				.then(response => response.json())
				.then(body => {
					this.lastSearch = this.search;
					this.results = body;
					this.appendResults();
					this.loading = false;
				});
		},
		appendResults() {
			if (this.listLength < this.results.length) {
				this.listLength += 4;
			}
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
