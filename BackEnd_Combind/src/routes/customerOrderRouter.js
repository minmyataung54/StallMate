const express = require('express');
const Order = require('../models/orderSchema');
const isLoggedIn = require('../middleware/authMiddleware');
const router = express.Router();

const StallOwnerProfile = require('../models/stallProfileSchema'); // Replace with the correct path to your StallOwner_profile model

router.get('/:customer_ID/history', isLoggedIn, async (req, res) => {
    try {
        const customerId = req.user._id;
        console.log('Fetching order history for customer ID:', customerId);

        // Fetch order history for the customer
        const orderHistory = await Order.find({ customerId }).sort({ createdAt: -1 });

        if (!orderHistory || orderHistory.length === 0) {
            return res.json({ message: 'No order history found', orders: [] });
        }

        // Fetch restaurant names and photos for each sellerId
        const ordersList = await Promise.all(
            orderHistory.map(async (order) => {
                // Find the corresponding StallOwner_profile by sellerId
                const stallOwner = await StallOwnerProfile.findOne({ StallOwnerID: order.sellerId }).select('restaurant.name restaurant.photo');
                return {
                    orderId: order._id,
                    sellerId: order.sellerId,
                    restaurantName: stallOwner && stallOwner.restaurant ? stallOwner.restaurant.name : 'Unknown', // Safely access restaurant name
                    restaurantPhoto: stallOwner && stallOwner.restaurant ? stallOwner.restaurant.photo : null, // Safely access restaurant photo
                    items: order.items,
                    totalAmount: order.totalAmount,
                    paymentMethod: order.paymentMethod,
                    createdAt: order.createdAt,
                };
            })
        );

        res.json({ orders: ordersList });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
});

module.exports = router;