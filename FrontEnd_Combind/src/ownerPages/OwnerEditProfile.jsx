import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOwnerAuth } from "../utilities/OwnerAuthContext";
import { useCookieAuth } from "../hooks/useCookieAuth";

import style from "./OwnerEditProfile.module.css";

import { LEFT_ARROW, CAMERA } from './OwnerEditProfile_ICON'

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL

const OwnerEditProfile = () => {
	const { authData } = useOwnerAuth();
	const { clearRole } = useCookieAuth();
	const [ isEditing, setIsEditing ] = useState(false);
	const [ localOwnerName, setLocalOwnerName ] = useState( authData?.ownerData.ownerName || "" );

	const navigate = useNavigate();

	const HandleLogout = async () => {
		await axios.get(`${BACK_END_BASE_URL}/auth/logout`, { withCredentials: true })
		.then(response => {
        	console.log(response.data.message);
        	clearRole(); 
        	window.location.href = '/';
    	})
    	.catch(error => {
        	console.error('Logout error:', error.response?.data || error.message);
        	alert('Logout failed. Please try again.');
    	});
	};

	const handleBackBtn = () => {
		navigate("/ownerStallProfile");
	};

	const handleNameChange = (e) => {
		setLocalOwnerName(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			setIsEditing(false);
		}
	};

	const handleFromSubmit = (e) => {
		e.preventDefault();
		console.log(localOwnerName);
	};

	
	return (
		<div
			className="container-fluid  d-flex flex-column pd-0"
			style={{ backgroundColor: "#01040F" }}
		>
			{/* Header Section */}
			<div
				className="container-fluid"
				style={{
					minHeight: "14%",
					backgroundColor: "#01040F",
				}}
			>
				<div className="row">
					<i
						className="text-white col-3 align-self-center mt-3 ms-0 ps-0"
						onClick={handleBackBtn}
					>
						{LEFT_ARROW}
					</i>
				</div>
				<div className="text-white col-12 align-self-center h3 row">
					<div className="d-flex justify-content-center mb-2">Personal</div>
					<div className="d-flex justify-content-center mb-2">Information</div>
				</div>
			</div>

			{/* Profile Section */}
			<div
				className="row"
				style={{ backgroundColor: "#191A1F", padding: "2rem 0" }}
			>
				<div className="col-12 d-flex flex-column justify-content-center align-items-center">
					<div className="position-relative">
						<img
							className="img-fluid"
							src="src/assets/userPicture.png"
							alt="userPicture"
							style={{ width: "170px" }}
						/>
						<i className="position-absolute bottom-0 end-0">{CAMERA}</i>
					</div>
				</div>
			</div>

			{/* Content */}
			<form onSubmit={handleFromSubmit}>
				<div
					className="container-fluid d-flex flex-column align-items-center justify-content-start mt-4"
					style={{ backgroundColor: "#01040F", paddingBottom: "1rem" }}
				>
					{/* Cards */}
					<div className="row text-white mb-3 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
							onClick={() => setIsEditing(true)}
						>
							<img
								className="me-3"
								src="src/assets/humanIcon.png"
								alt="human-icon"
								style={{ width: "40px" }}
							/>
							{isEditing ? (
								<input
									value={localOwnerName}
									onChange={handleNameChange}
									onKeyDown={handleKeyDown}
									onBlur={() => setIsEditing(false)} // Exit edit mode on blur
									autoFocus
									style={{
										background: "transparent",
										border: "none",
										color: "white",
										outline: "none",
									}}
								/>
							) : (
								<span>{localOwnerName}</span>
							)}
						</div>
					</div>

					{/* Repeat for additional cards */}
					<div className="row text-white my-2 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
						>
							<img
								className="me-3"
								src="src/assets/mapIcon.png"
								alt="map-icon"
								style={{ width: "40px" }}
							/>
							<span>England, London</span>
						</div>
					</div>

					<div className="row text-white my-2 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
						>
							<img
								className="me-3"
								src="src/assets/emailIcon.png"
								alt="email-icon"
								style={{ width: "40px" }}
							/>
							<span>david.beck@gmail.com</span>
						</div>
					</div>

					{/* Card 4 */}
					<div className="row text-white my-2 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
						>
							<img
								className="me-3"
								src="src/assets/sexIcon.png"
								alt="sex-icon"
								style={{ width: "40px" }}
							/>
							<span>Male</span>
						</div>
					</div>

					{/* Card 5 */}
					<div className="row text-white my-2 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
						>
							<img
								className="me-3"
								src="src/assets/mapIcon.png"
								alt="map-icon"
								style={{ width: "40px" }}
							/>
							<span>England, London</span>
						</div>
					</div>
					{/* Card 6 */}

					<div className="row text-white my-2 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
						>
							<img
								className="me-3"
								src="src/assets/cake1.png"
								alt="map-icon"
								style={{ width: "40px" }}
							/>
							<span>Date of Birth</span>
						</div>
					</div>

					{/* Card 7 */}

					<div className="row text-white my-2 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
						>
							<img
								className="me-3"
								src="src/assets/Earth.png"
								alt="map-icon"
								style={{ width: "40px" }}
							/>
							<span>Nationality</span>
						</div>
					</div>

					{/* Card 8 */}

					<div className="row text-white my-2 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
						>
							<img
								className="me-3"
								src="src/assets/translate.png"
								alt="map-icon"
								style={{ width: "40px" }}
							/>
							<span>Languages Spoken</span>
						</div>
					</div>

					{/* Card 9 */}

					<div className="row text-white my-2 w-75">
						<div
							className={`col-12 d-flex align-items-center p-2 ${style.cardBorder}`}
						>
							<img
								className="me-3"
								src="src/assets/ExpYear.png"
								alt="map-icon"
								style={{ width: "40px" }}
							/>
							<span>Experiences Year</span>
						</div>
					</div>
				</div>
			</form>
			{/* Finished */}
			<div className="row mb-2 d-flex justify-content-center">
				<div className="col-12 d-flex justify-content-center">
					<button className="btn">
						<h4
							className="text-white border-0 p-3"
							onClick={handleFromSubmit}
							style={{
								width: "22rem",
								backgroundColor: "#2B964F",
								borderRadius: "20px",
							}}
						>
							Finished
						</h4>
					</button>
				</div>
			</div>
			<div className="row mb-5 d-flex justify-content-center">
				<div className="col-12 d-flex justify-content-center">
					<button className="btn">
						<h4
							className="text-white border-0 p-3"
							onClick={HandleLogout}
							style={{
								width: "22rem",
								backgroundColor: "#660000",
								borderRadius: "20px",
							}}
						>
						Logout
						</h4>
					</button>
				</div>
			</div>
		</div>
	);
};

export default OwnerEditProfile;