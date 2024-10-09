{
  "_id": ObjectId(), // Automatically generated unique identifier
  "restaurant_name": String, // Name of the restaurant or stall
  "location": {
    "address": String, // Street address of the restaurant
    "city": String, // City where the restaurant is located
    "state": String, // State or province
    "postal_code": String // Postal or ZIP code
  },
  "menu": [
    {
      "food_name": String, // Name of the food item
      "price": Number, // Price of the food item
      "category": String, // Type of food (e.g., "Appetizer", "Main Course", "Beverage")
      "ingredients": [String], // List of ingredients used in the food item
      "add_ons": [ 
        {
          "name": String, // Name of the add-on (e.g., "Extra Cheese")
          "price": Number // Price of the add-on
        }
      ],
      "is_vegetarian": Boolean, // Whether the food is vegetarian (true/false)
      "is_gluten_free": Boolean, // Whether the food is gluten-free (true/false)
      "spiciness_level": { 
        "type": String, // Spiciness level description (e.g., "Mild", "Medium", "Hot")
        "value": Number // Numeric representation of spiciness (1 to 5)
      }
    },
  ],
  "opening_hours": {
    "weekday": String, // Example: "Mon-Fri"
    "open_time": String, // Opening time (e.g., "08:00 AM")
    "close_time": String // Closing time (e.g., "10:00 PM")
  },
  "contact": {
    "phone_number": String, // Contact phone number
    "email": String // Contact email
  },
  "social_media": {
    "facebook": String, // Link to Facebook page
    "instagram": String // Link to Instagram page
  },
  "rating": {
    "average": Number, // The average rating for the restaurant (e.g., 4.5)
    "number_of_reviews": Number // The number of reviews used to calculate the rating
  }
}
