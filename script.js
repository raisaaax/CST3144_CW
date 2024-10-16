let webstore = new Vue({
    el: "#app",
    data:{
        showProduct: true,
        pageTitle:"After School Classes", 
        pageContent:"Afterschool classes can be booked here",
        product1: { 
            id:1001,
            title: "Maths Catch-up",
            location: "London",
            price: "£100",
            availSp: 5,
            image: "images/maths.jpg"
            },
        product2: { 
            id:1002,
            title: "English Catch-up",
            location: "London",
            price: "£80",
            availSp: 5,
            image: "images/english.png"
            },
        cart: []
    },

    methods:{

        showCheckout(){
            this.showProduct = this.showProduct? false: true;
        },

        addItem(){
            this.cart.push(this.product1.id);
            console.log(this.cart);
        }

    }, 

    computed:{
        cartItemCount(){
            return this.cart.length || "";

        },
        canAddToCart(){
            return this.product1.availSp > this.cartItemCount;
        }
    }

})