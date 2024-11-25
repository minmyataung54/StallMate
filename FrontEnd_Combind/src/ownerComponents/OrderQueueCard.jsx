const OrderQueueCard = ({ clickShowDetail, order }) => {
	return (
		<div
			className="text-white"
			style={{
				backgroundColor: "black",
				minHeight: "7em",
				width: "80%",
				margin: "0 auto",
				padding: "0",
				borderRadius: "10px",
				cursor: "pointer",
			}}
			onClick={clickShowDetail}
		>
			<div className="row mt-2 p-0">
				<div className="col-4 mt-2 ms-2">
					<img
						src="src/assets/cakedhome.png"
						alt="Order Thumbnail"
						style={{ width: "6em" }}
					/>
				</div>

				<div className="col-7 d-flex-column justify-content-between mt-1">
					<div>
						<span className="h1">Order: </span>
						<span className="h5 text-truncate">{order.orderId.slice(-8)}</span>
					</div>
					<h5 className="mt-2">Table: {order.tableNumber}</h5>
					<div className="row mt-auto">
						<h6 className="text-success d-flex justify-content-end">
							Prices: {order.totalAmount} ฿
						</h6>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderQueueCard;