const express = require('express');
const Order = require('../models/orderSchema');
const { Menu } = require('../models/menuSchema');
const isLoggedIn = require('../middleware/authMiddleWare');
const router = express.Router();


router.put('/:seller_id/orders', isLoggedIn, async (req, res) => {
    try {
        const customerId = req.user._id; 
        const sellerId = req.params.seller_id;
        const { items, tableNumber, paymentMethod } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'No items provided in the order' });
        }

        const menu = await Menu.findOne({ seller: sellerId });
        if (!menu) {
            return res.status(404).json({ error: 'Menu not found for the given seller' });
        }

        
        let totalAmount = 0;
        const orderItems = items.map(item => {
            const menuItem = menu.items.find(menuItem => menuItem._id.toString() === item.menuId);
            if (!menuItem) {
                throw new Error(`Menu item with ID ${item.menuId} not found for this seller`);
            }
            const itemTotal = menuItem.price * item.quantity;
            totalAmount += itemTotal;
            return {
                menuId: menuItem._id,
                name: menuItem.name,
                name_en: menuItem.name_en,
                price: menuItem.price,
                quantity: item.quantity,
                notes: item.notes
            };
        });

        
        const newOrder = new Order({
            customerId,
            sellerId,
            items: orderItems,
            totalAmount,
            paymentMethod,
            tableNumber
        });

       
        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

router.get('/:seller_id/orders', isLoggedIn, async (req, res) => {
    try {
        const sellerId = req.params.seller_id; 

        console.log('Fetching orders for seller ID:', sellerId); 

        
        const upcomingOrders = await Order.find({ 
            sellerId, 
            orderStatus: 'pending' 
        }).sort({ createdAt: -1 }); 

        if (!upcomingOrders || upcomingOrders.length === 0) {
            return res.json({ message: 'No upcoming orders found', orders: [] });
        }

        
        const ordersList = upcomingOrders.map(order => ({
            orderId: order._id,
            customerId: order.customerId,
            items: order.items,
            totalAmount: order.totalAmount,
            tableNumber: order.tableNumber,
            createdAt: order.createdAt
        }));

        res.json({ message: 'Upcoming orders fetched successfully', orders: ordersList });
    } catch (error) {
        console.error('Error fetching upcoming orders:', error); 
        res.status(500).json({ error: 'Failed to fetch upcoming orders' });
    }
});


module.exports = router;