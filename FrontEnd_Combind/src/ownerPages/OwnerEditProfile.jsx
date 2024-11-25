import { useState, useRef } from "react";
import { useOwnerAuth } from "../utilities/OwnerAuthContext";
import { useCookieAuth } from "../hooks/useCookieAuth";
import axios from "axios";
import style from "./OwnerEditProfile.module.css";

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL

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

const OwnerEditProfile = ({ HandleIsRenderEditProfile, stallProfile }) => {
	const { authData } = useOwnerAuth();
	const { clearRole } = useCookieAuth();
	const [ isEditing, setIsEditing ] = useState(false);
	const [ localOwnerName, setLocalOwnerName ] = useState(stallProfile.owner_profile.full_name || "");
	const [ isEditingExpYear, setIsEditingExpYear ] = useState(false);
	const [ experienceYears, setExperienceYears ] = useState(stallProfile.owner_profile.experience_years || "");
	const [ isEditingBio, setIsEditingBio ] = useState(false);
	const [ bioState, setBioState] = useState(stallProfile.owner_profile.bio);
	const [ profilePhoto, setProfilePhoto ] = useState(stallProfile.owner_profile.profile_photo || "src/assets/userPicture.png");

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

	const HandleBackBtn = () => {
		HandleIsRenderEditProfile();
	};

	const HandleKeyDown = (e) => {
		if (e.key === "Enter") {
			setIsEditing(false);
		}
	};

	// Update Name state
	const HandleNameChange = (e) => {
		setLocalOwnerName(e.target.value);
	};

	// Update Bio state
	const HandleBioChange = (e) => {
		setBioState(e.target.value);
	};

	// Update Experience Years state
	const HandleExperienceYearChange = (e) => {
		const value = e.target.value;
		if (!isNaN(value) && value >= 0) {
			setExperienceYears(value);
		}
	};

	const HandleFromSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('profilePhoto', profilePhoto);
		formData.append('fullName', localOwnerName);
		formData.append('bio', bioState);
		formData.append('experienceYears', experienceYears);

		console.log('BACK_END_BASE_URL:', BACK_END_BASE_URL);
		console.log('authData?.ownerData.ownerID', authData?.ownerData.ownerID);

		console.log("Formdata : ", formData);

		try {
			const response = await axios.post(`${BACK_END_BASE_URL}/dashboard/stallowner/${authData?.ownerData.ownerID}/profile`, 
				formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
				console.log('Profile update successfully:', response.data);
				// alert('Profile update successfully!');
		} catch (error) {
			console.error('Error updating profile:', error.response?.data || error.message);
			//alert('Failed to updating profile. Please check the details and try again.');
		}
	};

	const fileInputRef = useRef(null);

	const handleAddFileChange = (e) => {
		const file = e.target.files[0];
		setProfilePhoto(file);
	};

	const HandleCameraClick = () => {
		fileInputRef.current.click();
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
						onClick={HandleBackBtn}
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
							src={profilePhoto}
							alt="userPicture"
							style={{ width: "170px" }}
						/>
						<i
							className="position-absolute bottom-0 end-0"
							onClick={HandleCameraClick}
						>
							{CAMERA}
						</i>
						<input
							type="file"
							ref={fileInputRef}
							style={{ display: "none" }}
							accept="image/*"
							onChange={handleAddFileChange}
						/>
					</div>
				</div>
			</div>

			{/* Content */}
			<form onSubmit={HandleFromSubmit}>
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
									onChange={HandleNameChange}
									onKeyDown={HandleKeyDown}
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
							onClick={() => setIsEditingBio(true)}
						>
							<img
								className="me-3"
								src="src/assets/bio.png"
								alt="sex-icon"
								style={{ width: "40px" }}
							/>
							{isEditingBio ? (
								<textarea
									value={bioState}
									onChange={HandleBioChange}
									onBlur={() => setIsEditingBio(false)} // Exit edit mode on blur
									autoFocus
									style={{
										background: "transparent",
										border: "none",
										color: "white",
										outline: "none",
										resize: "none", // Prevent resizing
										width: "100%", // Adjust width as needed
										minHeight: "50px", // Adjust height as needed
									}}
									placeholder="Write something about yourself..."
								/>
							) : (
								<span>{bioState || "Write something about yourself..."}</span>
							)}
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
							onClick={() => setIsEditingExpYear(true)}
						>
							<img
								className="me-3"
								src="src/assets/ExpYear.png"
								alt="map-icon"
								style={{ width: "40px" }}
							/>
							{isEditingExpYear ? (
								<span>
									Experiences Years:
									<input
										type="number"
										value={experienceYears}
										onChange={HandleExperienceYearChange}
										onBlur={() => setIsEditingExpYear(false)}
										autoFocus
										style={{
											background: "transparent",
											border: "none",
											color: "white",
											outline: "none",
											width: "100px",
										}}
									/>
								</span>
							) : (
								<span>
									Experiences Year : {experienceYears || "Experiences Year"}
								</span>
							)}
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
							onClick={HandleFromSubmit}
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