let webstore = new Vue({
    el: "#app",
    data:{
        pageTitle:"After School Classes", 
        pageContent:"Afterschool classes can be booked here",
        product1: { 
            id:1001,
            title: "Maths Catch-up",
            location: "London",
            price: "£100",
            availableSpaces: 5,
            image: "/images/maths.jpg"
            },
        product2: { 
            id:1001,
            title: "English Catch-up",
            location: "London",
            price: "£80",
            availableSpaces: 5,
            image: "/images/english.png"
            },
        cart: []
    }
})