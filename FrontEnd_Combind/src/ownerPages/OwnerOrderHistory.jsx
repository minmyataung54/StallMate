import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import OrderHistoryCard from "../ownerComponents/OrderHistoryCard";
import OrderDetailHistory from "../ownerComponents/OrderDetailHistory";
const OwnerOrderHistory = () => {
	const navigate = useNavigate();

	const ordersList = [
		{
			orderId: "641a4a6d3b9a6e1d5c8f7e29",
			customerId: "c12345",
			items: [
				{ name: "Pad Thai", quantity: 2, price: 80 },
				{ name: "Som Tum (Papaya Salad)", quantity: 1, price: 60 },
			],
			totalAmount: 220,
			tableNumber: 12,
			createdAt: "2024-11-22T15:30:00Z",
		},
		{
			orderId: "641a4a6d3b9a6e1d5c8f7e30",
			customerId: "c67890",
			items: [
				{ name: "Tom Yum Goong (Spicy Shrimp Soup)", quantity: 1, price: 150 },
				{ name: "Khao Pad (Fried Rice)", quantity: 2, price: 100 },
			],
			totalAmount: 350,
			tableNumber: 5,
			createdAt: "2024-11-22T16:00:00Z",
		},
		{
			orderId: "641a4a6d3b9a6e1d5c8f7e31",
			customerId: "c54321",
			items: [
				{ name: "Khao Soi (Northern Curry Noodles)", quantity: 3, price: 210 },
				{ name: "Moo Ping (Grilled Pork Skewers)", quantity: 3, price: 90 },
			],
			totalAmount: 300,
			tableNumber: 7,
			createdAt: "2024-11-22T16:30:00Z",
		},
		{
			orderId: "641a4a6d3b9a6e1d5c8f7e32",
			customerId: "c09876",
			items: [
				{ name: "Massaman Curry", quantity: 1, price: 120 },
				{ name: "Sticky Rice", quantity: 1, price: 20 },
			],
			totalAmount: 140,
			tableNumber: 3,
			createdAt: "2024-11-22T17:00:00Z",
		},
		{
			orderId: "641a4a6d3b9a6e1d5c8f7e33",
			customerId: "c11223",
			items: [
				{ name: "Pad Kra Pao (Basil Stir Fry)", quantity: 2, price: 160 }, // 80 THB each
				{ name: "Thai Iced Tea", quantity: 2, price: 80 }, // 40 THB each
			],
			totalAmount: 240, // 160 + 80
			tableNumber: 15,
			createdAt: "2024-11-22T18:00:00Z",
		},
	];

	const handleBackBtn = () => {
		navigate("/ownerStallProfile");
	};

	const LEFT_ARROW = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			fill="currentColor"
			className="bi bi-arrow-left"
			viewBox="0 0 16 16"
		>
			<path
				fillRule="evenodd"
				d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
			/>
		</svg>
	);

	const [detail, setDetail] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const groupOrdersByDate = (orders) => {
		return orders.reduce((acc, order) => {
			const date = format(new Date(order.createdAt), "dd MMM yyyy");
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(order);
			return acc;
		}, {});
	};

	const groupedOrders = groupOrdersByDate(ordersList);

	const handleCardClick = (order) => {
		console.log("Toggle");
		setSelectedOrder(order);
		setDetail(!detail); // Show detail view
	};

	return (
		<>
			{detail ? (
				<OrderDetailHistory
					detail={detail}
					setDetail={setDetail}
					order={selectedOrder}
				/>
			) : (
				<div className="container-fluid d-flex flex-column p-0">
					{/* Header Section */}
					<div
						className="container-fluid"
						style={{
							minHeight: "14%",
						}}
					>
						<div className="row d-flex ">
							<i
								className="text-white col-2 align-self-start my-3 ms-2 px-0"
								onClick={handleBackBtn}
							>
								{LEFT_ARROW}
							</i>
							<div className="text-white col-8 align-self-end mt-4 mx-0 ms-2">
								<div
									className="d-flex justify-content-start"
									style={{ fontSize: "2em", padding: "0px" }}
								>
									Order History
								</div>
							</div>
						</div>
					</div>
					<div className="container-fluid">
						{Object.keys(groupedOrders).map((date) => (
							<div key={date} className="mb-4">
								{/* Date Header */}
								<h5 className="text-white">{date}</h5>
								<hr
									className="text-white mt-0"
									style={{ border: "1px solid white" }}
								/>

								{/* Orders for the Date */}
								{groupedOrders[date].map((order) => (
									<OrderHistoryCard
										key={order.orderId}
										order={order}
										clickShowDetail={() => handleCardClick(order)}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default OwnerOrderHistory;