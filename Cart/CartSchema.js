{
    "_id": ObjectId(),  // Automatically generated unique identifier;
    "customer_id": ObjectId(),  // Unique identifier of the customer
    "restaurant_id": ObjectId(),  // Unique identifier of the restaurant
    "menu_id": ObjectId(),  // Unique identifier of the menu item
    "cart": [
        {
            "food_name": String,  // Name of the food item
            "price": Number,  // Price of the food item
            "quantity": Number,  // Number of items in the cart
            "add_ons": [
                {
                    "name": String,  // Name of the add-on
                    "price": Number  // Price of the add-on
                }
            ]
        }
    ],
}