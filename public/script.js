Vue.createApp({
	data() {
		return {
			total: 0,
			products: [
				{ title: "Product 1", id: 1, price: 9.99 },
				{ title: "Product 2", id: 2, price: 9.99 },
				{ title: "Product 3", id: 3, price: 9.99 }
			],
			cart: []
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
		}
	}
}).mount("#app");
