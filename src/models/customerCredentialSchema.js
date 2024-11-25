const mongoose = require('mongoose');
const moment = require('moment-timezone');

const customerSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        googleID: { 
            type: String, 
            required: true, 
            unique: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        stripeCustomerId: { 
            type: String 
        },
        createdAt: { 
            type: Date, 
            default: () => moment().tz('Asia/Bangkok').toDate() 
        }
    },
    { collection: 'Customer' }
);

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;