import { useCallback, useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { Navigate } from "react-router-dom";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
	const fetchClientSecret = useCallback(() => {
		// Create a Checkout Session
		return fetch(`${BACK_END_BASE_URL}/dashboard/customer/create-checkout-session`, {
			method: "POST",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((data) => data.clientSecret);
	}, []);

	const options = { fetchClientSecret };

	return (
		<div id="checkout">
			<EmbeddedCheckoutProvider
				stripe={stripePromise}
				options={options}
			>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	)
}

const Return = () => {
	const [status, setStatus] = useState(null);
	const [customerEmail, setCustomerEmail] = useState('');

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const sessionId = urlParams.get('session_id');

		fetch(`${BACK_END_BASE_URL}/dashboard/customer/session-status?session_id=${sessionId}`, {
			credentials: "include"
		})
			.then((res) => res.json())
			.then((data) => {
				setStatus(data.status);
				setCustomerEmail(data.customer_email);
			});
	}, []);

	if (status === 'open') {
		return (
			<Navigate to="/checkout" />
		)
	}

	if (status === 'complete') {
		return (
			<section id="success">
				<p>
					We appreciate your business! A confirmation email will be sent to {customerEmail}.

					If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
				</p>
			</section>
		)
	}

	return null;
}

export { CheckoutForm, Return };