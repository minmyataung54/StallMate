const express = require('express');
const Order = require('../models/orderSchema');
const StallOwnerProfile = require('../models/StallOwner_profile');
const isLoggedIn = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/:seller_id/rate', isLoggedIn, async (req, res) => {
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

        
        stallOwnerProfile.restaurant.rating.number_of_reviews += 1;
        const totalRating = (stallOwnerProfile.restaurant.rating.average * (stallOwnerProfile.restaurant.rating.number_of_reviews - 1)) + rating;
        stallOwnerProfile.restaurant.rating.average = totalRating / stallOwnerProfile.restaurant.rating.number_of_reviews;

        stallOwnerProfile.ratings[customerId] = rating;
        await stallOwnerProfile.save();

        res.json({ message: 'Rating submitted successfully', rating: stallOwnerProfile.restaurant.rating });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ error: 'Failed to submit rating' });
    }
});

module.exports = router;