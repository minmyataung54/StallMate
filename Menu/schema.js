{
  "_id": ObjectId(), // Automatically generated unique identifier
  "restaurant_name": String, // Name of the restaurant or stall
  "menu": [
    {
      "food_name_th": String, // Name of the food item
      "food_name_en": String, // Name of the food item
      "description_th": String, // Description of the food
      "description_en": String, // Description of the
      "price": Number, // Price of the food item
      "category": String, // Type of food (e.g., "Appetizer", "Main Course", "Beverage")
      "is_vegetarian": Boolean, // Whether the food is vegetarian (true/false)
      "is_gluten_free": Boolean, // Whether the food is gluten-free (true/false)
      "spiciness_level": { 
        "type": String, // Spiciness level description (e.g., "Mild", "Medium", "Hot")
        "value": Number // Numeric representation of spiciness (1 to 5)
      }
    },
  ],
}
