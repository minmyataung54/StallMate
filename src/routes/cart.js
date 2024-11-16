// const express = require('express');
// const Cart = require('../models/cartSchema');
// const isLoggedIn = require('../middleware/authMiddleWare');
// const router = express.Router();

// router.put('/:seller_id/menu/cart', isLoggedIn, async (req, res) => {
//     try {
//         const customerId = req.user._id; 
//         const { items } = req.body; 

//         if (!Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ error: 'No items provided' });
//         }

        
//         let cart = await Cart.findOne({ userId: customerId });
//         if (!cart) {
//             cart = new Cart({
//                 userId: customerId,
//                 items: [],
//             });
//         }
 
//         items.forEach(({ menuId, quantity, notes }) => {
//             const existingItemIndex = cart.items.findIndex(item => item.menuId.toString() === menuId);
//             if (existingItemIndex >= 0) {
                
//                 cart.items[existingItemIndex].quantity += quantity;
//                 if (notes) cart.items[existingItemIndex].notes = notes;
//             } else {
                
//                 cart.items.push({
//                     menuId,
//                     quantity: quantity || 1,
//                     notes: notes || '',
//                 });
//             }
//         });

        
//         await cart.save();
//         res.status(200).json({ message: 'Items added to cart successfully', cart });
//     } catch (error) {
//         console.error('Error adding items to cart:', error);
//         res.status(500).json({ error: 'Failed to add items to cart' });
//     }
// });

// router.get('/:seller_id/menu/cart', isLoggedIn, async (req, res) => {
//     try {
//         const customerId = req.user._id; // Assuming the user ID is stored in req.user

//         // Find the customer's cart and populate items with Menu details
//         const cart = await Cart.findOne({ userId: customerId }).populate('items.menuId');
//         if (!cart || cart.items.length === 0) {
//             return res.json({ message: 'Your cart is empty', total: 0, items: [] });
//         }

//         // Calculate the total price of all items in the cart
//         let total = 0;
//         const cartItems = cart.items.map(item => {
//             const price = item.menuId.price; // Accessing the price from the Menu model
//             total += price * item.quantity; // Calculate the total cost for each item
//             return {
//                 _id: item.menuId._id,
//                 name: item.menuId.name,
//                 price: item.menuID.pr,
//                 quantity: item.quantity,
//                 notes: item.notes
//             };
//         });

//         res.json({ total, items: cartItems });
//     } catch (error) {
//         console.error('Error fetching cart:', error);
//         res.status(500).json({ error: 'Failed to fetch cart' });
//     }
// });

// module.exports = router;

// module.exports = router;