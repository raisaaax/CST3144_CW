let webstore = new Vue({
    el: "#app",
    data:{
        showProduct: true,
        pageTitle:"After School Classes", 
        pageContent:"Afterschool classes can be booked here",
        products: [],
        cart: [], 
        order: {
            firstName:"", 
            phoneNr: ""
        },

        sortBy: "Price", 
        sortDirection: "Ascending"
    },

    created:

        function () {
            fetch("https://cst3144cwapp-env.eba-3mniueut.eu-west-2.elasticbeanstalk.com/collections/products").then(
                function (response) {
                    response.json().then(
                        function (json) {
                            webstore.products = json;
                        }
                    )
                }
            )
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
            const lessons = this.cartItems.map(item => ({
                lessonId: item.id,
                spaces: this.cartCount(item.id)  // Count of spaces booked for this lesson
            }));

            // Calculate total spaces
            const totalSpaces = lessons.reduce((total, lesson) => total + lesson.spaces, 0);

            // Create the order object
            const order = {
                name: `${this.order.firstName} ${this.order.lastName}`,
                phoneNumber: this.order.phoneNr,
                lessons: lessons,
                totalSpaces: totalSpaces  // Add total spaces booked for all lessons
            };

            
            fetch("https://cst3144cwapp-env.eba-3mniueut.eu-west-2.elasticbeanstalk.com/collections/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Order submitted successfully! Order ID: ${data.orderId}`);
                    // Clear the cart and reset the form
                    this.cart = [];
                    this.order = { firstName: "", lastName: "", phoneNr: "" };
                } else {
                    alert("Failed to submit order. Please try again.");
                }
            })
            .catch(error => {
                alert("An error occurred. Please try again.");
            });
        },

        canAddToCart(product){
            return product.availSp > this.cartCount(product.id);
        }, 

        setSort(criteria, direction) {
            this.sortBy = criteria;
            this.sortDirection = direction;
        },

        removeItem(productId) {
            this.cart = this.cart.filter(item => item !== productId);
        }
    
        
   

    }, 


    
    computed: {
        
        cartItemCount(){
            return this.cart.length;

        },

        cartItems(){
            return this.products.filter(product => this.cart.includes(product.id));
        },

        sortedProducts() {
            // to sort by price
            function sortByPrice (a, b) {
                if(a.price > b.price) return 1;
                if(a.price < b.price) return -1;
                return 0;
            }

            // to sort by subject
            function sortBySubject(a, b) {
                if(a.title > b.title) return 1;
                if(a.title < b.title) return -1;
                return 0;
            }

            // to sort by location
            function sortByLocation(a, b) {
                if(a.location > b.location) return 1;
                if(a.location < b.location) return -1;
                return 0;
            }

            // to sort by availability
            function sortByAvailability(a, b) {
                if(a.availSp > b.availSp) return 1;
                if(a.availSp < b.availSp) return -1;
                return 0;
            }
            
            // by price
            if(this.sortBy === "Price" && this.sortDirection === "Ascending")
                return this.products.sort(sortByPrice);
            if(this.sortBy === "Price" && this.sortDirection === "Descending")
                return this.products.sort(sortByPrice).reverse();
            
            // by subject
            if(this.sortBy === "Subject" && this.sortDirection === "Ascending")
                return this.products.sort(sortBySubject);
            if(this.sortBy === "Subject" && this.sortDirection === "Descending")
                return this.products.sort(sortBySubject).reverse();
            
            // by location
            if(this.sortBy === "Location" && this.sortDirection === "Ascending")
                return this.products.sort(sortByLocation);
            if(this.sortBy === "Location" && this.sortDirection === "Descending")
                return this.products.sort(sortByLocation).reverse();
            
            // by availability
            if(this.sortBy === "Availability" && this.sortDirection === "Ascending")
                return this.products.sort(sortByAvailability);
            if(this.sortBy === "Availability" && this.sortDirection === "Descending")
                return this.products.sort(sortByAvailability).reverse();

        }
    
    }

})