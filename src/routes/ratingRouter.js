const express = require('express');
const Order = require('../models/orderSchema');
const StallOwnerProfile = require('../models/StallOwner_profile');
const isLoggedIn = require('../middleware/authMiddleware');
const router = express.Router();


router.put('/:customer_id/history/:seller_id/rate', isLoggedIn, async (req, res) => {
    try {
        const customerId = req.user._id; 
        const sellerId = req.params.seller_id; 
        const { rating } = req.body; 

        
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        const completedOrder = await Order.findOne({
            customerId,
            sellerId,
            
        });

        if (!completedOrder) 
        {
            return res.status(403).json({ error: 'You can only rate a restaurant after completing an order' });
        }
        const stallOwnerProfile = await StallOwnerProfile.findOne({ StallOwnerID: sellerId });
        if (!stallOwnerProfile) 
        {
            return res.status(404).json({ error: 'Stall owner profile not found' });
        }

        if (!stallOwnerProfile.restaurant.rating) {
            stallOwnerProfile.restaurant.rating = {
                average: 0,
                number_of_reviews: 0
            };
        }

        if (!stallOwnerProfile.ratings) {
            stallOwnerProfile.ratings = {};
        }
        if (stallOwnerProfile.ratings[customerId]) {
            return res.status(403).json({ error: 'You have already rated this restaurant' });
        }

        console.log('Current average:', stallOwnerProfile.restaurant.rating.average);  // Let's say it's 5 from first review

// Calculate the previous total BEFORE incrementing number_of_reviews
        const previousTotalRating = Number(stallOwnerProfile.restaurant.rating.average) * 
                                (stallOwnerProfile.restaurant.rating.number_of_reviews);  // 5 * 1 = 5

        // Now increment the number of reviews
        stallOwnerProfile.restaurant.rating.number_of_reviews += 1;  // Now becomes 2

        // Add new rating
        const newTotalRating = previousTotalRating + Number(rating);  // 5 + 5 = 10

        console.log('New total:', newTotalRating);  // Should show 10
        console.log('Number of reviews:', stallOwnerProfile.restaurant.rating.number_of_reviews);  // Should show 2

        // Calculate new average
        stallOwnerProfile.restaurant.rating.average = newTotalRating / stallOwnerProfile.restaurant.rating.number_of_reviews;  // 10 / 2 = 5
        
        stallOwnerProfile.ratings[customerId] = rating;
        await stallOwnerProfile.save();

        res.json({ message: 'Rating submitted successfully', rating: stallOwnerProfile.restaurant.rating });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ error: 'Failed to submit rating' });
    }
});

module.exports = router;