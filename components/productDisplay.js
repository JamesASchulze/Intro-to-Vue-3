app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <a :href="product.url">
                <img :src="image"
                    :class="{ 'out-of-stock-img': !inStock }">
                </a>
            </div>
            <div class="product-info">
                <h1>{{ product.title }}</h1>
                <p>{{ product.description }}</p>
                <product-details :details="product.details"></product-details>
                <p>Shipping: {{ shipping }}</p>
                <div v-if="inStock > 0">
                    <p>In Stock</p>
                    <p v-if="product.onSale && inStock">{{ onSaleNote }}</p>
                </div>
                <div v-else><p>Out of Stock</p></div>
                <p>
                Sizes:
                <ul>
                    <li v-for="size in product.sizes">{{ size }}</li>
                </ul>
                </p>
                <div class="color-parent">
                <span>Available In:</span>
                <div 
                    v-for="(variant, index) in product.variants" 
                    :key="variant.id"
                    @mouseover="updateVariant(index)"
                    class="color-circle"
                    :style="{ backgroundColor: variant.color }"
                >
                    <!-- {{ variant.color }} -->
                </div>
                </div>
                <div 
                class="button"
                :class="{ disabledButton: !inStock }"
                :disabled="!inStock"
                @click="addToCart"
                >
                Add to Cart
                </div>
                <div 
                class="button"
                :class="{ disabledButton: cart === 0 }"
                @click="removeFromCart"
                >
                Remove One From Cart
                </div>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            product: {
                title: 'Super Duper Socks',
                description: 'Super duper, nice socks!',
                brand: 'James\'',
                url: 'https://github.com/JamesASchulze/Intro-to-Vue-3/blob/master/assets/images/socks_green.jpg',
                onSale: true,
                details: ['50% cotton','30% wool','20% polyester'],
                variants: [
                    { 
                        id: 2234,
                        color: 'green',
                        image: './assets/images/socks_green.jpg',
                        quantity: 42,
                        product: 'Green Socks' 
                    },
                    {
                        id: 2235,
                        color: 'blue',
                        image: './assets/images/socks_blue.jpg',
                        quantity: 0,
                        product: 'Blue Socks' 
                    }
                ],
                sizes: [
                    'Large',
                    'Medium',
                    'small'
                ]
            },
            selectedVariant: 0
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.product.variants[this.selectedVariant].id)
        },
        removeFromCart() {
            if(this.cart >= 1) {
                this.cart -= 1
            }
        },
        updateVariant(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        image() {
            return this.product.variants[this.selectedVariant].image
        },
        inStock() {
            return this.product.variants[this.selectedVariant].quantity
        },
        onSaleNote() {
            const brand = this.product.brand;
            const { product } = this.product.variants[this.selectedVariant];
            return `${brand} ${product} on sale!`
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99;
        }
    }
})