const express = require('express');
const Cart = require('../models/cartSchema');
const Menu = require('../models/menuSchema'); // Import the Menu schema
const isLoggedIn = require('../middleware/authMiddleWare');
const router = express.Router();

router.put('/:seller_id/menu/cart', isLoggedIn, async (req, res) => {
    try {
        const customerId = req.user._id; 
        const { items } = req.body; 

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'No items provided' });
        }

        // Validate each menuId before adding to the cart
        for (const item of items) {
            const menuItem = await Menu.findById(item.menuId);
            if (!menuItem) {
                return res.status(404).json({ error: `Menu item with ID ${item.menuId} not found` });
            }
        }

        // Find the customer's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId: customerId });
        if (!cart) {
            cart = new Cart({
                userId: customerId,
                items: [],
            });
        }

        // Add or update items in the cart
        items.forEach(({ menuId, quantity, notes }) => {
            const existingItemIndex = cart.items.findIndex(item => item.menuId.toString() === menuId);
            if (existingItemIndex >= 0) {
                cart.items[existingItemIndex].quantity += quantity;
                if (notes) cart.items[existingItemIndex].notes = notes;
            } else {
                cart.items.push({
                    menuId,
                    quantity: quantity || 1,
                    notes: notes || '',
                });
            }
        });

        // Save the updated cart
        await cart.save();
        res.status(200).json({ message: 'Items added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding items to cart:', error);
        res.status(500).json({ error: 'Failed to add items to cart' });
    }
});
router.get('/cart', isLoggedIn, async (req, res) => {
    try {
        const customerId = req.user._id; // Assuming the user ID is available in req.user

        // Find the customer's cart and populate 'menuId' to get details from the Menu schema
        const cart = await Cart.findOne({ userId: customerId }).populate('items.menuId');

        // If the cart is empty or no items found
        if (!cart || cart.items.length === 0) {
            return res.json({ message: 'Your cart is empty', total: 0, items: [] });
        }

        // Calculate the total price and format the cart items
        let total = 0;
        const cartItems = cart.items.map(item => {
            if (item.menuId) { // Ensure menuId is populated
                const price = item.menuId.price;
                total += price * item.quantity; // Accumulate total price

                return {
                    _id: item.menuId._id,
                    name: item.menuId.name,
                    price: price, // Extract the price
                    imageUrl: item.menuId.imageUrl,
                    quantity: item.quantity,
                    notes: item.notes
                };
            }
        }).filter(item => item !== undefined); // Filter out any undefined items

        // Send the formatted response
        res.json({ total, items: cartItems });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});


module.exports = router;