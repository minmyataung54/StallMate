import { useCallback, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '../Loading';
import axios from "axios";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
	const fetchClientSecret = useCallback(() => {
    	const CartItems = localStorage.getItem('cartData');
		let requestBody
		if (CartItems) {
			const parsedCartItems = JSON.parse(CartItems);
			requestBody = parsedCartItems.cartItems.map(item => ({ name: item.name, price: item.price,  quantity: item.quantity }));
		}

        return fetch(`${BACK_END_BASE_URL}/dashboard/customer/create-checkout-session`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }).then((res) => res.json()).then((data) => data.clientSecret);
    }, []);

	const options = { fetchClientSecret };

	return (
		<div id="checkout">
			<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	);
};

const Return = () => {
	const [ status, setStatus ] = useState(null);
	const [ customerEmail, setCustomerEmail ] = useState('');
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		setIsLoading(true);
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
		})
		.catch((error) => {
			console.error('Error fetching session status:', error);
		})
		.finally(() => {
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		if (status === 'complete') {
			const placeOrder = async () => {
				setIsLoading(true);
				const CartItems = localStorage.getItem('cartData');
				const parsedCartItems = JSON.parse(CartItems);
				console.log(parsedCartItems);
				let requestBody = {
					items: parsedCartItems.cartItems.map(item => ({
						menuId: item.menuId,
						quantity: item.quantity,
						notes: item.notes
					})),
					tableNumber: parsedCartItems.tableNumber,
					paymentMethod: parsedCartItems.paymentMethod
				};
				console.log(requestBody);
				try {
					const response = await axios.put(`${BACK_END_BASE_URL}/dashboard/stallowner/${parsedCartItems.ownerID}/orders`, 
						requestBody, 
						{ withCredentials: true }
					);
					console.log('Place order successfully:', response.data);
					alert('Place order successfully!');
					localStorage.removeItem('cartData');
				} catch (error) {
					console.error('Error place order:', error.response?.data || error.message);
					alert('Failed to Place order. Please check the details and try again.');
				} finally {
					setIsLoading(false);
				}
			};
			placeOrder();
		}
	}, [status]);

	if (status === 'open') {
		return (
			<Navigate to="/checkout" />
		);
	};

	if (status === 'complete' && isLoading) {
		return <Loading />;
	}

	if (status === 'complete' && !isLoading) {
		return (
			<section id="success">
				<p className="text-white">
					We appreciate your business! A confirmation email will be sent to {customerEmail}.
					If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
				</p>
			</section>
		);
	}

	if (status === 'cancel') {
		localStorage.removeItem('cartData');
		console.log('cancelled');
	}

	if (isLoading) {
		return <Loading />;
	}

	return null;
};

export { CheckoutForm, Return };