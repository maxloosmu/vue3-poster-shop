Vue.createApp({
	data() {
		return {
			total: 0,
			products: [],
			cart: [],
			search: "",
			lastSearch: "",
			loading: false
		};
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
			this.products = [];
			this.loading = true;
			fetch("/search?q=".concat(this.search))
				.then(response => response.json())
				.then(body => {
					this.lastSearch = this.search;
					this.products = body;
					this.loading = false;
				});
		}
	}
}).mount("#app");
