const products = [
	{id: 1,title: 'LenovoThinkpad x280', price: 1000.00, qty: 1, image: './img/ThinkPad_x280.png'},  
	{id: 2,title: 'Apple Macbook Pro',price: 2500.00, qty: 1,image: './img/MacBook-Pro.png'},  
	{id: 3,title: 'Amazon Kindle Ebook',price: 150.00,qty: 1,image: './img/Amazon_Kindle.png'},  
	{id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './img/usbC_to_hdmi.jpg'},  
];


// Your Code goes here


Vue.component('shopping-cart', {
	data () {
		return {
			
		}
	},
	props: ["items"]
});

var app = new Vue({
	el: '#app',
    data: {
		cartItems: [],
		products: products
    },
    methods: {
     addToCart: function(title, price, qty) {
		var item = {
			title: title,
			price: price,
			qty: qty,
			itemTotal: function() {
				return this.price * this.qty
			}
		};
		if (this.cartItems.filter(i => i.title === title).length > 0){

			for (i = 0; i < this.cartItems.length; i++) {
				if(this.cartItems[i].title == title){
					this.cartItems[i].qty += qty;
				}
			  }

		}else{
			this.cartItems.push(item);
		}
		return
	 },
	 removeItem: function(index) {
			this.cartItems.splice(index,1);
	 },

    
	},
	computed: {
		// a computed getter
		Total: function () {
		  // `this` points to the vm instance
		  return this.cartItems.map(item => item.itemTotal()).reduce((prev, next) => prev + next, 0)
		}
	  },
	  filters: {
		formatCurrency: function (value) {
		  if (!value) return ''
		 
		  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
		}
	  }
  })
