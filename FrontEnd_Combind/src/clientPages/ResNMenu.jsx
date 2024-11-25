import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useClientAuth } from '../utilities/ClientAuthContext';
import { addItem } from '../clientComponents/CartSlice';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "../clientComponents/Header";
import CartItem from '../clientComponents/CartItem';
import StallInfo from '../clientComponents/StallInfo';
import FavoriteIcon from '../clientComponents/FavoriteIcon';

import ArrowSVG from "../assets/arrow-left.svg";
import LanguageIMG from '../assets/lang.png';
import InfoSVG from '../assets/info.svg';

import axios from 'axios';

// Back-End base URL
const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const ResNMenu = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.items);
	const [selectedItem, setSelectedItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isCartVisible, setIsCartVisible] = useState(false);
	const [restaurants, setRestaurants] = useState();
	const [selectedLanguage, setSelectedLanguage] = useState("English");
	const [selectedCat, setSelectedCat] = useState("All");
	const [infoVisible, setInfoVisible] = useState(false);
	const [isFav, setIsFav] = useState(false);
	const { authData } = useClientAuth();
	const ownerID = useParams();

	useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${BACK_END_BASE_URL}/dashboard/stallowner/${ownerID.ownerID}/menu`, { withCredentials: true });
                if (response.status === 200) {
                    setRestaurants(response.data);
					setLoading(false);
					console.log(response.data);
                } else {
                    setRestaurants(null);
					setLoading(true);
                }
				console.log(response.status);
            } catch (error) {
                setRestaurants(null);
				setLoading(true);
            }
        };
        checkAuth();
    }, []);

	console.log(loading);
	console.log(ownerID.ownerID);

	const selectedRestaurant = restaurants


	if (loading) {
		return <div className="text-center text white">Loading...</div>;
	}

	const handleFoodClick = (item) => {
		console.log(item);
		setSelectedItem({ ...item, quantity: 1 });
	};
	const confirmAddToCart = () => {
		dispatch(addItem({
			...selectedItem,
			id: selectedItem._id,
			note: selectedItem.note,
			price: selectedItem.price,
			quantity: selectedItem.quantity,
			name: selectedItem.name,
			description: selectedItem.description,
			imageUrl: selectedItem.imageUrl
		}));
		setSelectedItem(null);
	};

	const handleQuantityChange = (newQuantity) => {
		setSelectedItem((prevItem) => ({
			...prevItem,
			quantity: Math.max(1, newQuantity),
		}));
	};

	const handleCartClick = () => {
		setIsCartVisible(!isCartVisible);
	};

	const handleContinueShopping = () => {
		setIsCartVisible(false);
	};

	const calculateTotalQuantity = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

	const handleSelectLanguage = (eventKey) => {
		if (eventKey === "1") {
			setSelectedLanguage("English");
		} else if (eventKey === "2") {
			setSelectedLanguage("Thai");
		}
	};

	const handleSelectCat = (eventKey) => {
		const categoryList = Object.keys(selectedRestaurant.categories);

		if (eventKey === `${categoryList.length + 1}`) {
			setSelectedCat("All");
		} else {
			setSelectedCat(categoryList[parseInt(eventKey) - 1]);
		}
	};

	const handleFav = () => {
		setIsFav(!isFav);
	}

	console.log(cartItems);

	return (
		<div className="container-fluid">
			{selectedRestaurant ? (
				<div style={{ marginTop: "20vw" }}>
					{isCartVisible ? (
						<div className="cart-modal">
							<div
								className="container-fluid d-flex fixed-top justify-content-between align-items-center text-white"
								style={{ height: "20vw", background: "#191A1F", zIndex: 1000, padding: "5vw" }}
							>
								<img
									src={ArrowSVG}
									alt=""
									onClick={handleContinueShopping}
								/>
							</div>
							<CartItem onContinueShopping={handleContinueShopping} cartItems={cartItems} />
						</div>
					) : selectedItem ? (
						<div className="item-detail-modal">
							<div className="card text-white" style={{ marginBottom: '6vw', background: "#01040F", borderRadius: "5vw", padding: "1vw", margin: "0vw 1vw" }}>
								<div className="row d-flex align-items-center justify-content-around" style={{ marginBottom: '3vw', marginTop: "2vw" }}>
									<div className="col">
										<img src={selectedItem.imageUrl} className="image-fluid rounded" style={{ width: "50vw", height: "auto", marginTop: "3vw" }} />
									</div>
									<div className="col align-items-center">
										<h2 className='text-white' style={{ fontSize: "6vw" }}>{selectedLanguage == 'English' ? selectedItem.name_en : selectedItem.name}</h2>
										<Dropdown onSelect={handleSelectLanguage} style={{ marginTop: "6vw" }}>
											<Dropdown.Toggle id="dropdown-basic" style={{ fontSize: "3.5vw", display: "flex", alignItems: "center", color: "black", fontWeight: 600, background: "#4CF986" }}>
												<img
													src={LanguageIMG}
													alt="Language Icon"
													style={{ width: "5vw", height: "5vw", marginRight: "1vw" }}
												/>
												{selectedLanguage}
											</Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item eventKey="1">English</Dropdown.Item>
												<Dropdown.Item eventKey="2">Thai</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
										<span className="badge bg-success rounded-pill" style={{ marginTop: "6vw", fontSize: "4vw" }}>${selectedItem.price}</span>
									</div>
								</div>
							</div>
							<p className='text-white' style={{ fontSize: "4vw", margin: "6vw 2vw" }}>Description : {selectedLanguage == 'English' ? selectedItem.description_en : selectedItem.description}</p>
							<div style={{ margin: "0vw 2vw" }}>
								<p className='text-white display-5'>Notes</p>
								<hr className="my-4" style={{
									borderTop: '0.5vw solid grey',
									width: '95vw',
									position: 'relative',
									left: '50%',
									transform: 'translateX(-50%)'
								}} />
								<textarea
									className="form-control table-form"
									placeholder="Add a note for the seller"
									rows="4"
									value={selectedItem.note || ''}
									onChange={(e) => setSelectedItem({ ...selectedItem, note: e.target.value })}
									style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}
								/>
								<hr className="my-4" style={{
									borderTop: '0.5vw solid grey',
									width: '95vw',
									position: 'relative',
									left: '50%',
									transform: 'translateX(-50%)'
								}} />
							</div>
							<div style={{ display: 'flex', alignItems: 'center', marginTop: '35vw', justifyContent: "center", marginBottom: "3.5vw" }}>
								<button className='bg-success'
									onClick={() => handleQuantityChange(selectedItem.quantity - 1)}
									style={{
										padding: '1vw',
										width: "8vw",
										height: "8vw",
										backgroundColor: '#6c757d',
										color: 'white',
										border: 'none',
										borderRadius: '50%',
										marginRight: '3vw'
									}}
									disabled={selectedItem.quantity <= 1}
								>
									-
								</button>

								<span className='text-white' style={{ fontSize: '6vw', margin: '0 2vw' }}>{selectedItem.quantity}</span>

								<button className='bg-success'
									onClick={() => handleQuantityChange(selectedItem.quantity + 1)}
									style={{
										padding: '1vw',
										width: "8vw",
										height: "8vw",
										backgroundColor: '#6c757d',
										color: 'white',
										border: 'none',
										borderRadius: '50%',
										marginLeft: '3vw'
									}}
								>
									+
								</button>
							</div>
							<div className="row align-items-center" style={{ margin: "1vw 1vw" }}>
								<button className='text-white bg-success' style={{ marginBottom: "4vw", height: "10vw", fontSize: "3.5vw" }} onClick={confirmAddToCart} >Add to Cart</button>
								<button className='text-white bg-danger' style={{ marginBottom: "4vw", height: "10vw", fontSize: "3.5vw" }} onClick={() => setSelectedItem(null)} >Cancel</button>
							</div>
						</div>
					) : infoVisible ? (
						<div>
							<div
								className="container-fluid d-flex fixed-top justify-content-between align-items-center text-white"
								style={{ height: "20vw", background: "#191A1F", zIndex: 1000, padding: "5vw" }}
							>
								<img
									src={ArrowSVG}
									alt=""
									onClick={() => setInfoVisible(!infoVisible)}
								/>
						</div>
							<StallInfo ownerID={ownerID.ownerID}/>
						</div>
					) : (
						<>
							<Header pageTitle={""} />
							<div className="card text-white" style={{ marginBottom: '6vw', marginTop: '6vw', background: "#01040F", borderRadius: "5vw", padding: "1vw", marginRight: "1vw", marginLeft: "1vw" }}>
								<div className="row d-flex align-items-center justify-content-around" style={{ marginBottom: '3vw', marginTop: "2vw" }}>
									<div className="col">
										<img src={selectedRestaurant.restaurant_image} className="image-fluid rounded" style={{ width: "43vw", height: "auto", marginTop: "3vw", borderRadius: "50vw"}} />
									</div>
									<div className="col">
										<h1 className="mb-4" style={{ fontSize: '7vw' }}>{selectedRestaurant.restaurant_name}</h1>
										<p className="card-text text-white" style={{ fontSize: "4vw" }}>
											<i className="bi bi-star" style={{ color: 'yellow' }}></i> {selectedRestaurant.rating.average}
											
										</p>
										<Dropdown onSelect={handleSelectLanguage} style={{ marginTop: "2vw" }}>
												<Dropdown.Toggle id="dropdown-basic" style={{ fontSize: "3.5vw", color: "black", fontWeight: 600, background: "#4CF986" }}>
													<img
														src={LanguageIMG}
														alt="Language Icon"
														style={{ width: "5vw", height: "5vw", marginRight: "1vw" }}
													/>
													{selectedLanguage}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item eventKey="1">English</Dropdown.Item>
													<Dropdown.Item eventKey="2">Thai</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
											<div className='col-12 d-flex align-items-center justify-content-between' style={{marginTop:"2vw"}}>
												<FavoriteIcon customerID={authData.clientData.clientID} stallownerID={ownerID}/>
												<span className='d-flex align-items-center justify-content-end'>
													<img src={InfoSVG} alt="" style={{width:"7.5vw", marginRight:"2vw"}} onClick={() => setInfoVisible(!infoVisible)}/>
												</span>
											</div>
										
									</div>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center" style={{ marginLeft: "1vw", marginRight: "1vw", marginTop: "2vw", background: 'black ', borderRadius: "2vw", padding: "1.5vw", marginBottom: "6vw" }}>
								<p className='text-white' style={{ marginRight: "5vw", fontSize: "4vw", marginTop: "2.6vw", fontWeight: "500" }}>Category</p>
								<Dropdown onSelect={handleSelectCat} style={{ marginRight: "3vw" }}>
									<Dropdown.Toggle style={{ fontSize: "3.5vw", color: "black", fontWeight: 600, background: "#4CF986" }}>
										{selectedCat}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{Object.keys(selectedRestaurant.categories).map((category, index) => (
											<Dropdown.Item eventKey={`${index + 1}`} key={category}>
												{category}
											</Dropdown.Item>
										))}
										<Dropdown.Item eventKey={`${Object.keys(selectedRestaurant.categories).length + 1}`}>All</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>

							</div>
							<div className="row">

								{selectedCat === "All" ? (
									<ul className="container-fluid" style={{ border: "none" }}>
										{Object.entries(selectedRestaurant.categories).map(([category, items]) => (
											<div key={category} className="col-12 text-white">
												<div className="card-header" style={{ border: "none" }}>
													<h3 style={{ fontSize: "6vw", color: "white", marginTop: "3vw", marginLeft: "1vw" }}>{category}</h3>
												</div>
												{items.map((item, index) => (
													<li
														key={index}
														className="card d-flex justify-content-between align-items-start text-white"
														style={{
															border: "none",
															marginBottom: "2vw",
															background: "none"
														}}
														onClick={() => handleFoodClick(item)}
													>
														<hr className="my-4" style={{
															borderTop: '2px solid grey',
															width: '90vw',
															position: 'relative',
															left: '50%',
															transform: 'translateX(-50%)'
														}} />
														<div className="row">
															<div className="col">
																<img src={item.imageUrl} alt={item.name} style={{ width: "30vw", height: "auto" }} />
															</div>
															<div className="col" style={{ display: 'flex', flexDirection: 'column', marginTop: "4vw" }}>
																<div className="row">
																	<p style={{ fontSize: "5vw", fontWeight: "600" }}>
																		{selectedLanguage === "English" ? item.name_en : item.name}
																	</p>
																	<div className="col" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "4vw" }}>
																		<span className="badge bg-success rounded-pill" style={{ marginRight: "10vw", fontSize: "4vw" }}>
																			{item.price} THB
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</li>
												))}
											</div>
										))}
									</ul>
								) : (
									Object.entries(selectedRestaurant.categories).map(([category, items]) => {
										if (selectedCat === category) {
											return (
												<div key={category} className="col-12 text-white">
													<div className="card-header" style={{ border: "none" }}>
														<h3 style={{ fontSize: "6vw", color: "white", marginTop: "3vw", marginLeft: "1vw" }}>{category}</h3>
													</div>
													<ul className="container-fluid" style={{ border: "none" }}>
														{items.map((item, index) => (
															<li
																key={index}
																className="card d-flex justify-content-between align-items-start text-white"
																style={{
																	border: "none",
																	marginBottom: "2vw",
																	background: "none"
																}}
																onClick={() => handleFoodClick(item)}
															>
																<hr className="my-4" style={{
																	borderTop: '2px solid grey',
																	width: '90vw',
																	position: 'relative',
																	left: '50%',
																	transform: 'translateX(-50%)'
																}} />
																<div className="row">
																	<div className="col">
																		<img src={item.imageUrl} alt={item.name} style={{ width: "30vw", height: "auto" }} />
																	</div>
																	<div className="col" style={{ display: 'flex', flexDirection: 'column', marginTop: "4vw" }}>
																		<div className="row">
																			<p style={{ fontSize: "5vw", fontWeight: "600" }}>
																				{selectedLanguage === "English" ? item.name_en : item.name}
																			</p>
																			<div className="col" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "4vw" }}>
																				<span className="badge bg-success rounded-pill" style={{ marginRight: "10vw", fontSize: "4vw" }}>
																					{item.price} THB
																				</span>
																			</div>
																		</div>
																	</div>
																</div>
															</li>
														))}
													</ul>
												</div>
											);
										}
										return null;
									})
								)}
							</div>
							<button
								className="btn btn-success rounded-circle cart-btn"
								style={{
									position: 'fixed',
									bottom: '5vw',
									right: '3vw',
									width: '15vw',
									height: '15vw',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									fontSize: '5vw',
								}}
								onClick={handleCartClick}
							>
								<div style={{ position: 'relative' }}>
									<i className="bi bi-cart" style={{ color: 'white', fontSize: '7vw' }}></i>
									<i className="rounded-circle" style={{
										position: 'absolute',
										top: '-0.8vw',
										right: '-0.8vw',
										color: 'white',
										background: 'red',
										width: '5vw',
										height: '5vw',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										fontSize: '2.5vw',
										marginRight: "-1.6vw"
									}}>
										{calculateTotalQuantity()}
									</i>
								</div>
							</button>
						</>
					)}
				</div>
			) : (
				<h2 className='text-white  d-flex justify-content-center display-3' style={{ marginTop: "5vw" }}>Restaurant not found</h2>
			)}


		</div>
	);

};

export default ResNMenu;