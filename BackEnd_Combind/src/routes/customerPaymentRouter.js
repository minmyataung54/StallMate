const express = require("express");
const Customer = require("../models/customerCredentialSchema");
const isLoggedIn = require("../middleware/authMiddleware");
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const FRONT_END_BASE_URL = process.env.FRONT_END_BASE_URL;

router.post("/create-checkout-session", isLoggedIn, async (req, res) => {
	const cartItems = req.body;
	const session = await stripe.checkout.sessions.create({
		ui_mode: 'embedded',
		line_items: cartItems.map(item => ({
			price_data: {
				currency: 'thb',
				product_data: {
					name: item.name
				},
				unit_amount: item.price * 100
			},
			quantity: item.quantity
		})),
		mode: 'payment',
		return_url: `${FRONT_END_BASE_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
	});
	
	res.send({clientSecret: session.client_secret});
});

router.get("/session-status", isLoggedIn, async (req, res) => {
	const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
	res.send({
	  	status: session.status,
	  	customer_email: session.customer_details.email
	});
});

module.exports = router;