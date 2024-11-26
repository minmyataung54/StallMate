const OrderDetailCard = ({ item }) => {
	return (
		<div className="row">
			<div className="col-3 d-flex justify-content-center">{item.quantity}</div>
			<div className="col-6">{item.name}</div>
			<div className="col-3">{item.price.toFixed(2)}฿</div>
		</div>
	)
}

export default OrderDetailCard