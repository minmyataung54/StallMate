const mongoose = require('mongoose');

const PAYMENT_METHODS = ['cash', 'card'];

const orderItemSchema = new mongoose.Schema({
    menuId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Menu', 
        required: true 
    },
    name: { type: String, required: true }, 
    name_en: { type: String }, 
    price: { type: Number, required: true }, 
    quantity: { type: Number, required: true, min: 1 }, 
    notes: { type: String } // Any additional notes for the item
}, { _id: false });

// Define the Order Schema
const orderSchema = new mongoose.Schema({
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    sellerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [orderItemSchema], 
    totalAmount: { type: Number, required: true },
    paymentMethod: { 
        type: String, 
        enum: PAYMENT_METHODS, 
        required: true 
    },
    orderStatus: { 
        type: String, 
        enum: ['pending', 'completed'], 
        default: 'pending' 
    },
    tableNumber: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { collection: 'Orders' });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;