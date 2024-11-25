import { useNavigate } from "react-router-dom";
import { useOwnerAuth } from "../utilities/OwnerAuthContext";
import { useState } from "react";
import style from "./OwnerEditProfile.module.css";

const OwnerEditProfile = () => {
	const { authData } = useOwnerAuth();
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);

	const [localOwnerName, setLocalOwnerName] = useState(
		authData?.ownerData.ownerName || ""
	);

	const handleBackBtn = () => {
		console.log("profile");
		navigate("/ownerProfile");
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

	const CAMERA = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			fill="white"
			className="bi bi-camera"
			viewBox="0 0 16 16"
		>
			<path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
			<path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
		</svg>
	);

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
			<div className="row mb-5 d-flex justify-content-center">
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
		</div>
	);
};

export default OwnerEditProfile;
