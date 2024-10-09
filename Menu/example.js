{
    "_id": ObjectId(),
    "restaurant_name": "Local Stall",
    "location": {
      "address": "123 Main St",
      "city": "Townsville",
      "state": "TX",
      "postal_code": "78945"
    },
    "menu": [
      {
        "food_name": "Cheeseburger",
        "price": 8.99,
        "category": "Main Course",
        "ingredients": ["Beef Patty", "Cheese", "Lettuce", "Tomato", "Onion", "Pickles"],
        "removable_ingredients": ["Tomato", "Onion", "Pickles"], // Ingredients that can be removed
        "add_ons": [
          {
            "name": "Extra Cheese",
            "price": 0.99
          },
          {
            "name": "Bacon",
            "price": 1.49
          }
        ],
        "is_vegetarian": false,
        "is_gluten_free": false,
        "spiciness_level": {
          "type": "Mild",
          "value": 1
        }
      }
    ],
    "opening_hours": {
      "weekday": "Mon-Fri",
      "open_time": "09:00 AM",
      "close_time": "09:00 PM"
    },
    "contact": {
      "phone_number": "555-1234",
      "email": "info@localstall.com"
    },
    "social_media": {
      "facebook": "https://facebook.com/localstall",
      "instagram": "https://instagram.com/localstall"
    },
    "rating": {
      "average": 4.2,
      "number_of_reviews": 120
    }
  }
  