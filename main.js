const app = Vue.createApp({
    data: function() {
        return {
            cart: [],
            premium: false
        }
    },
    methods: {
        updateCart() {
            this.cart += 1
        }
    }
})
