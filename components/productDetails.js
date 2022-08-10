app.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: 
    /*html*/
    `<p>
        Made up of:
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </p>`
})