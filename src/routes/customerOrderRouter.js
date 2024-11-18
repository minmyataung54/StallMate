const express = require('express');
const Order = require('../models/orderSchema');
const isLoggedIn = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:customer_ID/history', isLoggedIn, async (req, res) => {
    try {
        const customerId = req.user._id;
        console.log('Fetching order history for customer ID:', customerId);

        const orderHistory = await Order.find({ customerId }).sort({ createdAt: -1 });

        if (!orderHistory || orderHistory.length === 0) {
            return res.json({ message: 'No order history found', orders: [] });
        }

        const ordersList = orderHistory.map(order => ({
            orderId: order._id,
            sellerId: order.sellerId,
            items: order.items,
            totalAmount: order.totalAmount,
            // tableNumber: order.tableNumber,
            paymentMethod: order.paymentMethod,
            // orderStatus: order.orderStatus,
            createdAt: order.createdAt
        }));

        res.json({ orders: ordersList });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
});

module.exports = router;