import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useClientAuth } from "../utilities/ClientAuthContext";
import OrderHistoryCard from "../clientComponents/OrderHistoryCard";
import OrderDetailHistory from "../clientComponents/OrderDetailHistory";
import axios from "axios";

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const ClientOrderHistory = () => {
	const navigate = useNavigate();
	const { authData } = useClientAuth();
	const [ordersList, setOrdersList] = useState([]);
	const [checkList, setCheckList] = useState(true);

	useEffect(() => {
		const orderCompleteAuth = async () => {
			try {
				const response = await axios.get(
					`${BACK_END_BASE_URL}/dashboard/customer/${authData.clientData.clientID}/history`,
					{
						withCredentials: true,
						headers: { "Cache-Control": "no-store", Pragma: "no-cache" },
					}
				);
				if (response.status === 200) {
					if (response.data.orders && response.data.orders.length === 0) {
						setCheckList(false);
						setOrdersList([]);
					} else {
						setOrdersList(response.data.orders);
						setCheckList(true);
					}
				} else {
					setCheckList(false);
				}
			} catch (error) {
				console.error("Error fetching order history:", error);
				setOrdersList([]);
				setCheckList(false);
			}
		};
		orderCompleteAuth();
	}, [authData.clientData.clientID]); // Fixed dependency

	const handleBackBtn = () => {
		navigate("/clientHome");
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

	const groupedOrders = ordersList.length > 0 ? groupOrdersByDate(ordersList) : {};

	const handleCardClick = (order) => {
		setSelectedOrder(order);
		setDetail(true); // Show detail view
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
					<div className="container-fluid" style={{ minHeight: "14%" }}>
						<div className="row d-flex">
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
					{checkList ? (
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
					) : (
						<div className="text-white">No completed orders</div>
					)}
				</div>
			)}
		</>
	);
};

export default ClientOrderHistory;
