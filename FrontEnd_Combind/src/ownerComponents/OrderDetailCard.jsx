const OrderDetailCard = ({ item }) => {
	return (
		<div className="row">
			<div className="col-3 d-flex justify-content-center">{item.quantity}</div>
			<div className="col-6 row">
				<div>{item.name}</div>
				{item.notes_th? (
					<div>{`(${item.notes_th})`}</div>
				) : (
					<div></div>
				)
			}
				
			</div>
			<div className="col-3">{item.price.toFixed(2)}฿</div>
		</div>
	)
}

export default OrderDetailCard