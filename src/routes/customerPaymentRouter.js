const express = require('express');
const Stripe = require('stripe');
const Customer = require('../models/customer'); 
const isLoggedIn = require('../middleware/authMiddleware');
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.post('/:customer_id/add-payment-method', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id; // The authenticated user's ID
        const { paymentMethodId } = req.body; // Payment Method ID from the front end

        
        const user = await Customer.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        if (!user.stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: req.user.email, 
                payment_method: paymentMethodId,
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });

            // Save the Stripe customer ID to the user's record in your database
            user.stripeCustomerId = customer.id;
            await user.save();
        } else {
            // If the user already has a Stripe customer ID, attach the new payment method
            await stripe.paymentMethods.attach(paymentMethodId, {
                customer: user.stripeCustomerId,
            });

            // Update the default payment method for the customer
            await stripe.customers.update(user.stripeCustomerId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });
        }

        res.status(200).json({ message: 'Payment method added successfully' });
    } catch (error) {
        console.error('Error adding payment method:', error);
        res.status(500).json({ error: 'Failed to add payment method' });
    }
});

module.exports = router;