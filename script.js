let webstore = new Vue({
    el: "#app",
    data:{
        showProduct: true,
        pageTitle:"After School Classes", 
        pageContent:"Afterschool classes can be booked here",
        products: [],
        cart: [], 
        order: {
            name: "", 
            phoneNr: "",
        },
        // holds error messages for RegEx
        nameError: "", 
        phoneError: "",
        searchWord: "",
        sortBy: "Price", 
        sortDirection: "Ascending"
    },

    created:

        //lifecycle hook 
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

        //toggle between 
        showCheckout(){
            this.showProduct = this.showProduct? false: true;
        },
        
        //adds item to cart
        addItem(product){
            this.cart.push(product.id);
            console.log(this.cart);
        }, 

        canAddToCart(product){
            return product.availSp > this.cartCount(product.id);
        }, 

        setSort(criteria, direction) {
            this.sortBy = criteria;
            this.sortDirection = direction;
        },

        //removes item from cart
        removeItem(productId) {
            this.cart = this.cart.filter(item => item !== productId);
        },

        //regEx for validating name input 
        validateName() {
            const nameRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces
            if (!nameRegex.test(this.order.name)) {
                this.nameError = "Name must only contain letters.";
            } else {
                this.nameError = ""; // Clear error if valid
            }
        },

        //regEx for validating phone number input 
        validatePhone() {
            const phoneRegex = /^\+?[0-9]\d{9}$/; // Only numbers
            if (!phoneRegex.test(this.order.phoneNr)) {
                this.phoneError = "Phone number must only contain numbers, and 10 digits long";
            } else {
                this.phoneError = ""; // Clear error if valid
            }
        },

        async placeOrder() {
            

            const lessons=this.cartItems.map(item => ({ lessonId: item.id, spaces: this.cartCount(item.id) })) ;
            const orderData = {
                name: this.order.name, 
                phoneNumber: this.order.phoneNr, 
                lessons: lessons ,
                totalSpaces: lessons.reduce((total, lesson) => total + lesson.spaces, 0)
                
            };

            // Send the POST request to the back-end
            await fetch("https://cst3144cwapp-env.eba-3mniueut.eu-west-2.elasticbeanstalk.com/collections/orders", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData), 

            }).then(
                function (response) {
                    response.json().then(
                        function (json) {
                            if (json.success) {
                                alert("Order placed with number: " + json.orderId);
                            } else {
                                alert("Failed to place order: " + json.message);
                            }
                        }
                    );
                }
            ).catch(function (error) {
                console.error("Error placing the order:", error);
                alert("There was an error placing the order. Please try again.");
            });

        }, 

        // search() {
        //     if (this.searchWord.trim() !== '') {
        //       fetch("https://cst3144cwapp-env.eba-3mniueut.eu-west-2.elasticbeanstalk.com/collections/products/search/${this.searchWord}")
        //         .then(response => response.json())
        //         .then(data => {
        //           this.lessons = data; // Update lessons with search results
        //         })
        //         .catch(error => console.error('Error searching lessons:', error));
        //     } else {
        //       this.fetchLessons(); // Reset to all lessons if search is empty
        //     }
        //   },
    }, 
    
    computed: {
        
        cartItemCount(){
            return this.cart.length;

        },

        //displays items that have been added to cart
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

        }, 

        //checks if order fields are valid 
        //by ensuring error fields are empty 
        isFormValid(){
            return this.nameError === "" & this.phoneError === "" && this.order.name && this.order.phoneNr;
        }
    
    }

})