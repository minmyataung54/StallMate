const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    menuId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Menu', 
        required: true 
    },
    notes: { type: String },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    stallownerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true // Add stallownerId to associate with the seller
    },
    items: [cartItemSchema],
    updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;