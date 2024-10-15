// For shop owner login
{
    "_id": ObjectId(),  // Automatically generated unique identifier;
    "username": String,  // The user's display name or chosen username
    "google_id": String,  // Google account ID (provided by Google OAuth)
    "email": String,  // User's email address associated with Google account
    "created_at": Date,  // Timestamp of account creation
    "restaurant_id": ObjectId(),  // Unique identifier of the restaurant associated
    "restaurant_name": String, 
    "location": {
    "address": String, // Street address of the restaurant
    "city": String, // City where the restaurant is located
    "state": String, // State or province
    },
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