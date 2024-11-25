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
				unit_amount: item.price * 100 // Convert to small currency unit
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














/*router.put("/:customer_id/add-card", isLoggedIn, async (req, res) => {
	try {
		const { paymentMethodId } = req.body;
		const customerId = req.params.customer_id;

		if (!paymentMethodId) {
			return res.status(400).json({ error: "Payment method ID is required." });
		}

		// Fetch the user from your database
		const user = await Customer.findById(customerId);

		if (!user) {
			return res.status(404).json({ error: "User not found." });
		}

		let stripeCustomerId = user.stripeCustomerId;

		if (!stripeCustomerId) {
			// Create a new Stripe customer if the user doesn't have one
			const customer = await stripe.customers.create({
				payment_method: paymentMethodId,
				email: req.user.email,
				invoice_settings: { default_payment_method: paymentMethodId },
			});
			stripeCustomerId = customer.id;
			user.stripeCustomerId = stripeCustomerId;
			await user.save();
		} else {
			// Attach the payment method to the existing Stripe customer
			await stripe.paymentMethods.attach(paymentMethodId, {
				customer: stripeCustomerId,
			});

			// Update the default payment method for the customer
			await stripe.customers.update(stripeCustomerId, {
				invoice_settings: { default_payment_method: paymentMethodId },
			});
		}

		const orderDetails = req.session.orderDetails;

		if (orderDetails) {
			return res.status(200).json({
				message: "Card added successfully. You can now proceed with your order.",
				// redirectUrl: `http://localhost:3000/dashboard/stallowner/${orderDetails.sellerId}/orders`,
				redirectUrl: `http://ec2-13-215-252-79.ap-southeast-1.compute.amazonaws.com:3000/dashboard/customer/${customerId}/orders`,
				paymentMethodId,
				orderDetails,
			});
		}

		res.status(200).json({
			message: "Card added successfully.",
			redirectUrl: `http://ec2-13-215-252-79.ap-southeast-1.compute.amazonaws.com:3000/dashboard/customer/${customerId}`,
		});
	} catch (error) {
		console.error("Error adding card:", error);
		res.status(500).json({ error: "Failed to add payment method" });
	}
});*/