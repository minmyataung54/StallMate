import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useOwnerAuth } from '../utilities/OwnerAuthContext';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';

import LangICON from '../assets/lang.png'
import EditLogoSVG from '../assets/edit.svg'
import ArrowSVG from '../assets/arrow-left.svg'
import MenuNameIMG from '../assets/menuName.png';
import DollarIMG from '../assets/dollar.png';
import CloudIMG from '../assets/Cloud.png';
import SearchSVG from "../assets/search.svg";
import StallQRCodeIMG from '../assets/stallqr.png';
import CategorySVG from '../assets/catego.svg';
import ShopSVG from '../assets/shop.svg';
import LocationSVG from '../assets/location.svg';
import Loading from "../Loading";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const OwnerStallMenu = ({ HandleIsRenderStallMenu, stallProfile }) => {
	const navigate = useNavigate();
	const { authData } = useOwnerAuth();
	const [ selectedRestaurant, setSelectedRestaurant ] = useState({
		restaurant_id: stallProfile.StallOwnerID,
		restaurant_name: stallProfile.restaurant.name,
		restaurant_image: stallProfile.restaurant.photo,
		rating: {
		  	number_of_reviews: 0,
		  	average: 0
		},
		categories: {
			"Beverages": [],
			"Main Dish": [],
			"Snacks": [],
			"Appetizers": [],
			"Side-dish": [],
			"Soup": [],
			"Salads": [],
			"Desserts": [],
			"Others": []
		},
		qrcode_url: null
	});

	const [ loading, setLoading ] = useState(true);
	const [ selectedLanguage, setSelectedLanguage ] = useState("English");
	const [ selectedMenu, setSelectedMenu ] = useState(null);
	const [ isResVisible, setIsResVisible ] = useState(false);
	const [ isQrVisible, setIsQrVisible ] = useState(false);
	const [ addMenu, setAddMenu ] = useState(false);
	const [ selectedAddMenu, setSelectedAddMenu ] = useState({ imageUrl: null, name: "",description: "", price: 0, category: "" });
	const [ searchVisible, setSearchVisible ] = useState(false);
	const [ query, setQuery ] = useState("");
	const [ editRes, setEditRes ] = useState({
		restaurant_name: stallProfile.restaurant.name,
		restaurant_image: stallProfile.restaurant.photo,
		opening_hours: stallProfile.restaurant.opening_hours.map((day) => ({
			weekday: day.weekday,
			open_time: day.open_time,
			close_time: day.close_time,
		})),
		location: {
			address: stallProfile.restaurant.location.address,
			city: stallProfile.restaurant.location.city,
			state: stallProfile.restaurant.location.state
		},
		contact: {
			phone: stallProfile.restaurant.contact.phone,
			email: stallProfile.restaurant.contact.email
		}
	});

	console.log('addMenu:', addMenu);

	useEffect(() => {
		console.log('isRun:');
        const menuAuth = async () => {
            try {
                const response = await axios.get(`${BACK_END_BASE_URL}/dashboard/stallowner/${authData?.ownerData.ownerID}/menu`, { 
					withCredentials: true,
					headers: { "Cache-Control": "no-store", Pragma: "no-cache" }
				});
                if (response.status === 200) {
					if (response.data.message === 'No menu items available.') {
						setSelectedRestaurant({
							restaurant_id: stallProfile.StallOwnerID,
							restaurant_name: stallProfile.restaurant.name,
							restaurant_image: stallProfile.restaurant.photo,
							rating: {
								number_of_reviews: 0,
								average: 0
							},
							categories: {
								"Beverages": [],
								"Main Dish": [],
								"Snacks": [],
								"Appetizers": [],
								"Side-dish": [],
								"Soup": [],
								"Salads": [],
								"Desserts": [],
								"Others": []
							},
							qrcode_url: response.data.qrcode_url
						});
						setLoading(false);
					} else {
						setSelectedRestaurant(response.data);
						setLoading(false);
					}
				console.log('isFinish:');
                } else {
                    setSelectedRestaurant(null);
					setLoading(true);
                }
            } catch (error) {
                setSelectedRestaurant(null);
				setLoading(true);
            }
        };
        menuAuth();
    }, [addMenu, selectedMenu]);

	console.log(stallProfile);
	console.log(editRes.opening_hours);

	const [selectedDay, setSelectedDay] = useState("Monday");

	const handleMenuCreate = async (e) => {
		e.preventDefault();
		
		if (!selectedAddMenu.imageUrl) {
			alert('Please select an image file.');
			return;
		}

		console.log(selectedAddMenu.imageUrl)

		const formData = new FormData();
		formData.append('image', selectedAddMenu.imageUrl);
		formData.append('name', selectedAddMenu.name);
		formData.append('description', selectedAddMenu.description);
		formData.append('price', selectedAddMenu.price);
		formData.append('category', selectedAddMenu.category);

		console.log('BACK_END_BASE_URL:', BACK_END_BASE_URL);
		console.log('authData?.ownerData.ownerID', authData?.ownerData.ownerID);

		try {
			const response = await axios.put(`${BACK_END_BASE_URL}/dashboard/stallowner/${authData?.ownerData.ownerID}/menu`, 
				formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
				console.log('Menu created successfully:', response.data);
				setSelectedAddMenu({ imageUrl: null, name: "", description: "", price: 0, category: "" });
				setAddMenu(false);
				alert('Menu created successfully!');
				
		} catch (error) {
			console.error('Error creating menu:', error.response?.data || error.message);
			alert('Failed to create menu. Please check the details and try again.');
		}
	};

	


	if (loading) {
		return <Loading />;
	}

	const handleFoodClick = (item) => {
		console.log(item);
		setSelectedMenu({ ...item });
	};

	const handleHeadBackBtn = () => {
		navigate(-1);
	};

	const handleSearchBtn = () => {
		setSearchVisible(!searchVisible);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		console.log("Searching for:", query);
		setQuery("");
	};



	const handleEditRes = () => {
		setIsResVisible(!isResVisible);
	}

	const handleQr = () => {
		setIsQrVisible(!isQrVisible);
	}

	const handleSelectLanguage = (eventKey) => {
		if (eventKey === "1") {
			setSelectedLanguage("English");
		} else if (eventKey === "2") {
			setSelectedLanguage("Thai");
		}
	};

	const handleFormChange = (e) => {
		setSelectedMenu(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}
	const handleAddFormChange = (e) => {
		const { name, value } = e.target;
		setSelectedAddMenu((prev) => ({
			...prev,
			[name]: value,
		}));
	};


	const handleBackBtn = () => {
		setSelectedMenu(null);
	}


	const handleAddBtn = () => {
		setAddMenu(!addMenu);
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
			setSelectedMenu((prev) => ({
				...prev,
				imageUrl: file,
			}));
	};

	const handleAddFileChange = (e) => {
			const file = e.target.files[0];
			setSelectedAddMenu((prev) => ({
				...prev,
				imageUrl: file,
			}));
	};

	const handleAddImageClick = () => {
		document.getElementById('fileInputAdd').click();
	};

	const handleImageClick = () => {
		document.getElementById('fileInput').click();
	};
	

	const HandleEditMenu = async (e) => {
		e.preventDefault();


		console.log("selectedMenu : ",selectedMenu);

		const formData = new FormData();
		formData.append('image', selectedMenu.imageUrl);
		formData.append('name', selectedMenu.name);
		formData.append('description', selectedMenu.description);
		formData.append('price', selectedMenu.price);

		console.log('BACK_END_BASE_URL:', BACK_END_BASE_URL);
		console.log('authData?.ownerData.ownerID', authData?.ownerData.ownerID);

		console.log("Formdata : ", formData);

		try {
			const response = await axios.post(`${BACK_END_BASE_URL}/dashboard/stallowner/${authData?.ownerData.ownerID}/menu/${selectedMenu._id}`, 
				formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
				console.log('Menu edited successfully:', response.data);
				alert('Menu edited successfully!');
				setSelectedMenu(null);
		} catch (error) {
			console.error('Error editing menu:', error.response?.data || error.message);
			//alert('Failed to edit menu. Please check the details and try again.');
		}
	};

	const handleDeleteMenu = async () =>{
		try {
			const response = await axios.delete(`${BACK_END_BASE_URL}/dashboard/stallowner/${authData?.ownerData.ownerID}/menu/${selectedMenu._id}`
				, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
				console.log('Menu deleted successfully:', response.data);
				alert('Menu deleted successfully!');
				setSelectedMenu(null);
		} catch (error) {
			console.error('Error deleting menu:', error.response?.data || error.message);
			alert('Failed to delete menu. Please check the details and try again.');
		}
	}


	const handleResSubmit = async (e) => {
		e.preventDefault();

		const filteredDays = editRes.opening_hours.filter(
            (day) => day.open_time && day.close_time
        );

		console.log(editRes)
		console.log('Type of editRes.location:', typeof(editRes.location));
		console.log('Type of editRes.opening_hours:', typeof(editRes.opening_hours));
		console.log('Type of editRes.contact:', typeof(editRes.contact));
		console.log('editRes.location:', editRes.location);
		console.log('editRes.opening_hours:', editRes.opening_hours);
		console.log('editRes.contact:', editRes.contact);

		const formData = new FormData();
		formData.append('restaurantPhoto', editRes.restaurant_image);
		formData.append('restaurantName', editRes.restaurant_name);
		formData.append('location[address]', editRes.location.address);
		formData.append('location[city]', editRes.location.city);
		formData.append('location[state]', editRes.location.state);
		//formData.append('openingHours', JSON.stringify(editRes.opening_hours));
		filteredDays.forEach((day, index) => {
			formData.append(`openingHours[${index}][weekday]`, day.weekday);
			formData.append(`openingHours[${index}][open_time]`, day.open_time);
			formData.append(`openingHours[${index}][close_time]`, day.close_time);
		});
		formData.append('contact[phone]', editRes.contact.phone);
		formData.append('contact[email]', editRes.contact.email);

		console.log('formData:', formData);

		console.log('BACK_END_BASE_URL:', BACK_END_BASE_URL);
		console.log('authData?.ownerData.ownerID', authData?.ownerData.ownerID);

		try {
			const response = await axios.post(`${BACK_END_BASE_URL}/dashboard/stallowner/${authData?.ownerData.ownerID}/profile`, 
				formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
				console.log('edit restaurant successfully:', response.data);
				alert('edit restaurant info successfully!');
				setEditRes({
					restaurant_name: editRes.restaurant_name,
					restaurant_image: editRes.restaurant_image,
					opening_hours: filteredDays.map((day) => ({
						weekday: day.weekday,
						open_time: day.open_time,
						close_time: day.close_time,
					})),
					location: {
						address: editRes.location.address,
						city: editRes.location.city,
						state: editRes.location.state
					},
					contact: {
						phone: editRes.contact.phone,
						email: editRes.contact.email
					}
				})
				setIsResVisible(false);
		} catch (error) {
			console.error('Error creating menu:', error.response?.data || error.message);
			alert('Failed to edit restaurant info. Please check the details and try again.');
		}
	};

	const handleResImageClick = () => {
		document.getElementById('fileInputRes').click();
	}

	const handleResFileChange = (e) => {
		const file = e.target.files[0];
			setEditRes((prev) => ({
				...prev,
				restaurant_image: file,
			}));
	}

	const handleResForm = (e) => {
		const { name, value, dataset } = e.target;
		const day = dataset.day;
	
		setEditRes((prev) => {
			if (day) {
				const dayExists = prev.opening_hours.some((entry) => entry.weekday === day);
				const updatedHours = dayExists
					? prev.opening_hours.map((entry) =>
						  entry.weekday === day ? { ...entry, [name]: value } : entry
					  )
					: [
						  ...prev.opening_hours,
						  { weekday: day, open_time: "", close_time: "", [name]: value },
					  ];
				return { ...prev, opening_hours: updatedHours };
			}

			if (["address", "city", "state"].includes(name)) {
				return {
					...prev,
					location: {
						...prev.location,
						[name]: value,
					},
				};
			}

			if (["phone", "email"].includes(name)) {
				return {
					...prev,
					contact: {
						...prev.contact,
						[name]: value,
					},
				};
			}

			return { ...prev, [name]: value };
		});
	};
	
	const handleRemoveOpeningHours = (index) => {
        setEditRes((prev) => ({
            ...prev,
            openinghours: prev.opening_hours.filter((_, i) => i !== index),
        }));
    };

	const handleAddOpeningHours = () => {
		setEditRes((prev) => {
			if (prev.opening_hours.length >= 7) {
				alert("You can't add more than 7 days!");
				return prev;
			}
	
			const usedDays = prev.opening_hours.map((entry) => entry.weekday);
			const availableDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].filter(
				(day) => !usedDays.includes(day)
			);
	
			return {
				...prev,
				opening_hours: [
					...prev.opening_hours,
					{ weekday: availableDays[0] || "", open_time: "", close_time: "" }, // Default to the first unused day
				],
			};
		});
	};

	return (
		<div className="container-fluid"> 
			{selectedRestaurant ? (
				selectedMenu ? (
					<div>
						<div className="container-fluid">
							<div className="container-fluid d-flex fixed-top justify-content-between align-items-center text-white" style={{ height: "20vw", background: "#191A1F", zIndex: 1000, padding: "4vw" }}>
								<img src={ArrowSVG} alt="" onClick={handleBackBtn} />
								<p className="display-5" style={{ marginRight: "37vw", marginTop: "2vw" }}>Menu</p>
							</div>
						</div>

						<div className='row' style={{ marginTop: "35vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
							<img src={selectedMenu.imageUrl} alt="" style={{ width: "60vw" }} />
							<form onSubmit={HandleEditMenu} className='d-flex flex-column justify-content-center align-items-center' style={{ position: "relative" }}>
								<img
									src={EditLogoSVG}
									alt="Edit Logo"
									style={{ width: "12vw", position: "absolute", left: "70vw", top: "-10vw", cursor: "pointer" }}
									onClick={handleImageClick}
								/>
								<input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />

								<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw", marginTop: "6vw" }}>
									<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
										<img src={MenuNameIMG} alt="" style={{ height: "8vw" }} />
									</span>
									<input
										className='text-white'
										type="text"
										onChange={handleFormChange}
										name="name"
										value={selectedMenu.name || ""}
										style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
									/>
								</div>
								<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
									<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
										<img src={DollarIMG} alt="" style={{ height: "8vw" }} />
									</span>
									<input
										className='text-white'
										type="number"
										onChange={handleFormChange}
										name="price"
										value={selectedMenu.price || ""}
										style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
									/>
								</div>
								<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
									<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
										<img src={CloudIMG} alt="" style={{ height: "8vw" }} />
									</span>
									<input
										className='text-white'
										type="text"
										onChange={handleFormChange}
										name="description"
										value={selectedMenu.description || ""}
										style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
									/>
								</div>

								<div className='d-flex justify-content-around align-items-center fixed-bottom' style={{ marginBottom: "7vw" }}>
									<button type='submit' className='d-flex justify-content-center align-items-center text-white' style={{ width: "40vw", height: "12vw", background: "#2B964F", fontSize: "3.5vw", borderRadius: "4vw" }}>
										Finished
									</button>
									<button onClick={handleDeleteMenu} className='d-flex justify-content-center align-items-center text-white' style={{ width: "40vw", height: "12vw", background: "#dd7973", fontSize: "3.5vw", borderRadius: "4vw" }}>
										Delete this menu
									</button>
								</div>
							</form>
						</div>
					</div>
				) : (
					isResVisible ? (
						<div>

							<div className="container-fluid">
								<div
									className="container-fluid d-flex fixed-top justify-content-between align-items-center text-white"
									style={{ height: "20vw", background: "#191A1F", zIndex: 1000, padding: "4vw" }}
								>
									<img src={ArrowSVG} alt="" onClick={handleEditRes} />
									<p className="display-5" style={{ marginRight: "37vw", marginTop: "2vw" }}>Menu</p>
								</div>
							</div>


							<div className='row' style={{ marginTop: "20vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
								<img src={editRes.restaurant_image} alt="" style={{ width: "60vw" }} />
								<form onSubmit={handleResSubmit} className='d-flex flex-column justify-content-center align-items-center' style={{ position: "relative" }}>
									<img
										src={EditLogoSVG}
										alt="Edit Logo"
										style={{ width: "12vw", position: "absolute", left: "70vw", top: "-10vw", cursor: "pointer" }}
										onClick={handleResImageClick}
									/>
									<input id="fileInputRes" type="file" accept="image/*" style={{ display: "none" }} onChange={handleResFileChange} />

									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw", marginTop: "6vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<img src={ShopSVG} alt="" style={{ height: "8vw" }} />
										</span>
										<input
											className='text-white'
											type="text"
											onChange={handleResForm}
											name="restaurant_name"
											value={editRes.restaurant_name || ""}
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>
									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<img src={LocationSVG} alt="" style={{ height: "8vw" }} />
										</span>
										<input
											className='text-white'
											type="text"
											onChange={handleResForm}
											name="address"
											value={editRes.location.address || ""}
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>
									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<p className='text-white' style={{ fontSize: "3.5vw", margin: 0 }}>City</p>
										</span>
										<input
											className='text-white'
											type="text"
											onChange={handleResForm}
											name="city"
											value={editRes.location.city || ""}
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>
									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<p className='text-white' style={{ fontSize: "3.5vw", margin: 0 }}>State</p>
										</span>
										<input
											className='text-white'
											type="text"
											onChange={handleResForm}
											name="state"
											value={editRes.location.state || ""}
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>

									<div className="openHour-container">
										{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((dayName) => {
											const dayData = editRes.opening_hours.find((entry) => entry.weekday === dayName) || {
											weekday: dayName,
											open_time: "",
											close_time: "",
											};

											return (
											<div key={dayName} className="day-input-group" style={{ marginBottom: "2vw" }}>
												<div
												className="input-group d-flex align-items-center"
												style={{
													marginBottom: "2vw",
													gap: "2vw",
													display: "flex",
													alignItems: "center",
												}}
												>
												<span
													className="day-label d-flex justify-content-center align-items-center"
													style={{
													background: "#01040F",
													border: "none",
													height: "12vw",
													width: "20vw",
													borderRadius: "2vw 0 0 2vw",
													color: "white",
													fontSize: "3vw",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													}}
												>
													{dayName}
												</span>
												<input
													className="text-white"
													type="time"
													name="open_time"
													data-day={dayName}
													value={dayData.open_time}
													onChange={handleResForm}
													placeholder="Open Time"
													style={{
													flex: 1,
													height: "12vw",
													background: "#01040F",
													border: "none",
													fontSize: "3.5vw",
													color: "white",
													padding: "0 1vw",
													}}
												/>
												<input
													className="text-white"
													type="time"
													name="close_time"
													data-day={dayName}
													value={dayData.close_time}
													onChange={handleResForm}
													placeholder="Close Time"
													style={{
													flex: 1,
													height: "12vw",
													background: "#01040F",
													border: "none",
													fontSize: "3.5vw",
													borderRadius: "0 2vw 2vw 0",
													color: "white",
													padding: "0 1vw",
													}}
												/>
												</div>
											</div>
											);
										})}
										</div>
									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<p className='text-white' style={{ fontSize: "3.5vw", margin: 0 }}>Phone</p>
										</span>
										<input
											className='text-white'
											type="text"
											onChange={handleResForm}
											name="phone"
											value={editRes.contact.phone || ""}
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>

									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<p className='text-white' style={{ fontSize: "3.5vw", margin: 0 }}>Email</p>
										</span>
										<input
											className='text-white'
											type="email"
											onChange={handleResForm}
											name="email"
											value={editRes.contact.email || ""}
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>
									<div style={{marginBottom:"20vw"}}></div>






									<div className='d-flex justify-content-center align-items-center fixed-bottom' style={{ marginBottom: "7vw" }}>
										<button type='submit' className='d-flex justify-content-center align-items-center text-white' style={{ width: "95vw", height: "12vw", background: "#2B964F", fontSize: "3.5vw", borderRadius: "4vw" }}>
											Finished
										</button>
									</div>
								</form>
							</div>
						</div>
					) : addMenu ? (
						<div>

							<div className="container-fluid">
								<div
									className="container-fluid d-flex fixed-top justify-content-between align-items-center text-white"
									style={{ height: "20vw", background: "#191A1F", zIndex: 1000, padding: "4vw" }}
								>
									<img src={ArrowSVG} alt="" onClick={handleAddBtn} />
								</div>
							</div>


							<div className='row' style={{ marginTop: "30vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
								<p className='d-flex justify-content-center align-items-center text-white display-3'>Add Menu Image</p>
								<img src={selectedAddMenu.imageUrl} style={{ width: "60vw", marginBottom: "12vw", color: "white" }} />
								<form onSubmit={handleMenuCreate} className='d-flex flex-column justify-content-center align-items-center' style={{ position: "relative" }}>
									<img
										src={EditLogoSVG}
										alt="Edit Logo"
										style={{ width: "12vw", position: "absolute", left: "70vw", top: "-10vw", cursor: "pointer" }}
										onClick={handleAddImageClick}
									/>
									<input id="fileInputAdd" type="file" accept="image/*" style={{ display: "none" }} onChange={handleAddFileChange} />

									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw", marginTop: "6vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<img src={MenuNameIMG} alt="" style={{ height: "8vw" }} />
										</span>
										<input
											className='text-white'
											type="text"
											onChange={handleAddFormChange}
											name="name"
											value={selectedAddMenu.name || ""}
											placeholder='Menu Name'
											required
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>
									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<img src={DollarIMG} alt="" style={{ height: "8vw" }} />
										</span>
										<input
											className='text-white'
											type="number"
											onChange={handleAddFormChange}
											name="price"
											placeholder='Price'
											value={selectedAddMenu.price || ""}
											required
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>
									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<img src={CloudIMG} alt="" style={{ height: "8vw" }} />
										</span>
										<input
											className='text-white'
											type="text"
											onChange={handleAddFormChange}
											name="description"
											value={selectedAddMenu.description || ""}
											placeholder='Description'
											required
											style={{ width: "75vw", height: "15vw", marginBottom: "1vw", background: "#01040F", border: "none", fontSize: "4vw", borderRadius: "0 2vw 2vw 0" }}
										/>
									</div>
									<div className="input-group d-flex justify-content-center align-items-center" style={{ marginBottom: "3vw" }}>
										<span className='d-flex justify-content-center align-items-center' style={{ background: "#01040F", border: "none", height: "15vw", width: "15vw", marginTop: "-1vw", borderRadius: "2vw 0 0 2vw" }}>
											<img src={CategorySVG} alt="" style={{
												height: "8vw",
												filter: "invert(65%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
											}} />
										</span>
										<select
                                            className='text-white'
                                            onChange={handleAddFormChange}
                                            name="category"
                                            value={selectedAddMenu.category || ""}
                                            required
                                            style={{ 
                                                width: "75vw", 
                                                height: "15vw", 
                                                marginBottom: "1vw", 
                                                background: "#01040F", 
                                                border: "none", 
                                                fontSize: "4vw", 
                                                borderRadius: "0 2vw 2vw 0",
                                                color: "white" 
                                            }}
                                        >
                                            <option value="" disabled>Select Category</option>
                                            <option value="Beverages">Beverages</option>
                                            <option value="Main Dish">Main Dish</option>
                                            <option value="Snacks">Snacks</option>
                                            <option value="Appetizers">Appetizers</option>
                                            <option value="Side-dish">Side-dish</option>
                                            <option value="Soup">Soup</option>
                                            <option value="Salads">Salads</option>
                                            <option value="Desserts">Desserts</option>
                                            <option value="Others">Others</option>
                                        </select>
									</div>


									<div className='d-flex justify-content-center align-items-center fixed-bottom' style={{ marginBottom: "7vw" }}>
										<button type='submit' className='d-flex justify-content-center align-items-center text-white' style={{ width: "95vw", height: "12vw", background: "#2B964F", fontSize: "3.5vw", borderRadius: "4vw" }}>
											Finished
										</button>
									</div>
								</form>
							</div>
						</div>
					) : isQrVisible ? (
						<div>
							<div className="container-fluid">
								<div
									className="container-fluid d-flex fixed-top justify-content-between align-items-center text-white"
									style={{ height: "20vw", background: "#191A1F", zIndex: 1000, padding: "4vw" }}
								>
									<img src={ArrowSVG} alt="" onClick={handleQr} />
								</div>
								<div 
									className="card text-white" 
									style={{ 
										marginBottom: "6vw", 
										marginTop: "21vw", 
										background: "#01040F", 
										borderRadius: "5vw", 
										padding: "1vw", 
										marginRight: "1vw", 
										marginLeft: "1vw" 
									}}
									>
									<div className="d-flex flex-column align-items-center justify-content-center">
										<img 
										src={selectedRestaurant.restaurant_image} 
										className="img-fluid rounded" 
										style={{ 
											width: "43vw", 
											height: "auto", 
											marginTop: "3vw" 
										}} 
										alt="Restaurant" 
										/>
										<h1 
										className="text-center" 
										style={{ 
											fontSize: "7vw", 
											marginBottom: "2vw", 
											marginTop: "2vw" 
										}}
										>
										{selectedRestaurant.restaurant_name}
										</h1>
									</div>
									</div>
								<div className='d-flex align-items-center justify-content-center'>
									<img src={selectedRestaurant.qrcode_url} alt="" style={{ width: "80vw", borderRadius: "5vw" }} />
								</div>
							</div>
						</div>
					) : (
						<div style={{ marginTop: "20vw" }}>
							<div className="container-fluid">
								<div
									className="container-fluid d-flex fixed-top justify-content-between align-items-center text-white"
									style={{ height: "20vw", background: "#191A1F", zIndex: 1000, padding: "4vw" }}
								>
									<img
										src={ArrowSVG}
										alt=""
										onClick={() => {
											HandleIsRenderStallMenu();
										}}
									/>
									<div>
										<img
											src={StallQRCodeIMG}
											alt=""
											onClick={handleQr}
											style={{ width: "7vw", marginRight: "5vw" }}
										/>
										<img
											src={SearchSVG}
											alt=""
											onClick={handleSearchBtn}
										/>
									</div>
								</div>
								{searchVisible && (
									<div
										className="container-fluid"
										style={{
											width: '85vw',
											marginLeft: 'auto',
											marginRight: 'auto',
											marginTop: '18vw',
										}}
									>
										<form onSubmit={handleSearchSubmit} className='w-100 d-flex justify-content-between'>
											<div className="input-group">
												<span className="input-group-text" style={{ background: '#0E162C', border: 'none' }}>
													<i className="bi bi-search" style={{ color: 'white' }}></i>
												</span>
												<input
													type="text"
													className="form-control custom-placeholder"
													placeholder="Search your interesting foods or restaurants..."
													aria-label="Search"
													value={query}
													onChange={(e) => setQuery(e.target.value)}
													required
													style={{ background: '#0E162C', height: '9vw', border: 'none' }}
												/>
											</div>
										</form>
									</div>
								)}

							</div>
							<div className="card text-white" style={{ marginBottom: "6vw", marginTop: "6vw", background: "#01040F", borderRadius: "5vw", padding: "1vw", marginRight: "1vw", marginLeft: "1vw" }}>
								<div className="row d-flex align-items-center justify-content-around" style={{ marginBottom: "3vw", marginTop: "2vw" }}>
									<div className="col">
										<img src={selectedRestaurant.restaurant_image} className="image-fluid rounded" style={{ width: "43vw", height: "auto", marginTop: "3vw" }} alt="Restaurant" />
									</div>
									<div className="col">
										<div className="row d-flex align-items-center justify-content-end">
											<img src={EditLogoSVG} alt="" style={{ width: "10vw", marginRight: "6vw" }} onClick={handleEditRes} />
											<h1 style={{ fontSize: "7vw", marginBottom: "2vw" }}>
												{selectedRestaurant.restaurant_name}
											</h1>
										</div>
										<p className="card-text text-white" style={{ fontSize: "4vw" }}>
											<i className="bi bi-star" style={{ color: "yellow" }}></i> {selectedRestaurant.rating.average}
										</p>
										<Dropdown onSelect={handleSelectLanguage} style={{ marginTop: "2vw" }}>
											<Dropdown.Toggle variant="success" id="dropdown-basic" style={{ fontSize: "3.5vw", color: "black", fontWeight: 600, background: "#4CF986" }}>
												<img src={LangICON} alt="Language Icon" style={{ width: "5vw", height: "5vw", marginRight: "1vw" }} />
												{selectedLanguage}
											</Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item eventKey="1">English</Dropdown.Item>
												<Dropdown.Item eventKey="2">Thai</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>
								</div>
							</div>
							<div className="container-fluid d-flex justify-content-end">
								<button style={{ fontSize: "3.5vw", fontWeight: 600, padding: "1.5vw", background: "#4CF986", borderRadius: "2vw" }} onClick={handleAddBtn}>
									Add New Menu
								</button>
							</div>
							<ul className="container-fluid" style={{ border: "none" }}>
								{Object.entries(selectedRestaurant.categories).map(([category, items]) => (
									<div key={category} className="col-12 text-white">
										<div className="card-header" style={{ border: "none" }}>
											<h3 style={{ fontSize: "6vw", color: "white", marginTop: "3vw", marginLeft: "1vw" }}>{category}</h3>
										</div>
										{items.map((item, index) => (
											<li key={index} className="card d-flex justify-content-between align-items-start text-white" style={{ border: "none", marginBottom: "2vw", background: "none" }}>
												<hr className="my-4" style={{ borderTop: '2px solid grey', width: '90vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} />
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
																<span onClick={() => handleFoodClick(item)}>
																	<img src={EditLogoSVG} alt="" />
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
						</div>
					)
				)
			) : null}
		</div>
	);

};


export default OwnerStallMenu;