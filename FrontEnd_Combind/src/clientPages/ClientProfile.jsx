import React from "react";
import { useNavigate } from "react-router-dom";
import { useClientAuth } from '../utilities/ClientAuthContext';
import style from "./ClientProfile.module.css";

const STAR_ICON = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="30"
		height="30"
		fill="#FFD700"
		class="bi bi-star-fill"
		viewBox="0 0 16 16"
	>
		<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
	</svg>
);

const PEN_ICON = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="25"
		height="25"
		fill="currentColor"
		class="bi bi-pencil-square"
		viewBox="0 0 16 16"
	>
		<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
		<path
			fill-rule="evenodd"
			d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
		/>
	</svg>
);

const ClientProfile = ({ userName, reviews, isLoading, onUpdateName }) => {
	const { authData } = useClientAuth();
	const navigate = useNavigate();
	const handleBackBtn = () => {
		navigate("/clientHome");
	};

	const handleChangeName = () => {
		navigate("/clientEditProfile");
	};

	const handleWallet = () => {
		console.log("wallet");
	};

	const handleMastercard = () => {
		console.log("Mastercard");
	};

	return (

		<div className="container-fluid">
			<div
				className={`container-fluid fixed-top bg-black`}
				style={{ height: "7%" }}
			>
				<img
					className="mt-3"
					src="src/assets/arrow-left.svg"
					alt="arrow-left-icon"
					onClick={handleBackBtn}
				/>
			</div>
			<div className="container-fluid mt-5">
				<div className={`row ${style.content}`}>
					<div className="col-7 d-flex flex-column justify-content-center">
						<div
							className="container d-flex justify-content-center align-items-center border rounded-pill mb-2"
							style={{ height: "45px" }}
						>
							<p className="mb-0 me-3">{authData?.clientData.clientName}</p>
							{/* {isLoading ? "Loading..." : userName} */}
							<i onClick={handleChangeName}>{PEN_ICON}</i>
						</div>
						<div
							className="container d-flex justify-content-center align-items-center border-0 rounded-pill my-2"
							style={{ height: "45px", backgroundColor: "#2B964F" }}
						>
							{STAR_ICON}
							<div className="ms-2">{reviews}10 Reviews</div>
						</div>
					</div>

					<div className="col-5 border-0">
						<img
							className="img-fluid"
							src="src/assets/userPicture.png"
							alt="user-picture"
						/>
					</div>
				</div>
			</div>

			<div className="container-fluid mt-5 ">
				<div className="row d-flex justify-content-around">
					<div
						onClick={handleWallet}
						className="col d-flex mx-1 flex-column justify-content-center border-0 align-items-center"
						style={{
							height: "120px",
							backgroundColor: "black",
							borderRadius: "15px",
						}}
					>
						<img
							className="w-50 h-50"
							src="src/assets/wallet-icon.png"
							alt="Wallet-icon"
						/>
						<p className="text-white fw-bold">Wallet</p>
					</div>

					<div
						onClick={handleMastercard}
						className="col d-flex flex-column mx-1 justify-content-center border-0 rounded align-items-center"
						style={{
							height: "120px",
							backgroundColor: "black",
							borderRadius: "15px",
						}}
					>
						<img
							className="w-50 h-50"
							src="src/assets/mastercard-icon.png"
							alt="mastercard-icon"
						/>
						<p className="text-white fw-bold">MasterCard</p>
					</div>
				</div>
			</div>

			<div
				className={`container-fluid my-3 pt-2 bg-black  text-white  mx-0 pb-2 border-0 rounded ${style.mockup}`}
			>
				<h5>General</h5>
				<div className="d-flex justify-content-between">
					<span>
						<p>Favorites</p>
					</span>
					<span>
						<p>&gt;</p>
					</span>
				</div>
				<hr />

				<div className="d-flex justify-content-between">
					<span>
						<p>Settings</p>
					</span>
					<span>
						<p>&gt;</p>
					</span>
				</div>

				<hr />

				<div className="d-flex justify-content-between">
					<span>
						<p>Language</p>
					</span>
					<span>
						<p>&gt;</p>
					</span>
				</div>
				<hr />
				<div className="d-flex justify-content-between">
					<span>
						<p>Safety Setting</p>
					</span>
					<span>
						<p>&gt;</p>
					</span>
				</div>
				<hr />

				<div className="d-flex justify-content-between">
					<span>
						<p>Saved Places</p>
					</span>
					<span>
						<p>&gt;</p>
					</span>
				</div>

				<hr />
				<h5>Support</h5>
				<div className="d-flex justify-content-between">
					<span>
						<p>Help center</p>
					</span>
					<span>
						<p>&gt;</p>
					</span>
				</div>

				<hr />

				<div className="d-flex justify-content-between">
					<span>
						<p>Share Feedback</p>
					</span>
					<span>
						<p>&gt;</p>
					</span>
				</div>
				<hr />
			</div>
		</div>
	);
};

export default ClientProfile;
