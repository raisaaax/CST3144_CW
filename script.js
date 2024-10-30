let products = [
    { 
        id:1001,
        title: "Maths Catch-up",
        location: "London",
        price: "£50",
        availSp: 10,
        image: "images/maths.jpg"
    },

    { 
        id:1002,
        title: "English Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },

    { 
        id:1003,
        title: "History Catch-up",
        location: "London",
        price: "£20",
        availSp: 10,
        image: "images/english.png"
    },

    { 
        id:1004,
        title: "Geography Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
    { 
        id:1005,
        title: "Arts and Crafts Workshop",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
    { 
        id:1006,
        title: "English Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
    { 
        id:1007,
        title: "English Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
    { 
        id:1008,
        title: "English Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
    { 
        id:1009,
        title: "English Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
    { 
        id:1010,
        title: "English Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
    { 
        id:1011,
        title: "English Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
    { 
        id:1012,
        title: "English Catch-up",
        location: "London",
        price: "£80",
        availSp: 10,
        image: "images/english.png"
    },
]


let webstore = new Vue({
    el: "#app",
    data:{
        showProduct: true,
        pageTitle:"After School Classes", 
        pageContent:"Afterschool classes can be booked here",
        products: products,
        cart: [], 
        order: {
            firstName:"", 
            lastName: "", 
            phoneNr: ""
        },
    },
    

    methods:{

        cartCount(id){
            let count = 0;
            for(let i = 0; i < this.cart.length; i++){
                if (this.cart[i] === id){
                    count++;
                }

            }
            return count;
        },

        showCheckout(){
            this.showProduct = this.showProduct? false: true;
        },

        addItem(product){
            this.cart.push(product.id);
            console.log(this.cart);
        }, 

        submitForm(){
            alert("Order successfully submitted!")
            // later should add order info to db 
        }, 

        canAddToCart(product){
            return product.availSp > this.cartCount(product.id);
        }, 

    }, 

    computed:{
        
        cartItemCount(){
            return this.cart.length;

        },

       

        

    }

})