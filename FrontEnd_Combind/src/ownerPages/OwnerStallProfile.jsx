import { useNavigate } from "react-router-dom";
import { useOwnerAuth } from "../utilities/OwnerAuthContext";
import { useState, useEffect } from "react";
import { STAR_ICON, PEN_ICON, STALL_ICON, QUEUE_ICON, HISTORY_ICON } from "./OwnerStallProfile_ICON";
import Loading from "../Loading";
import axios from "axios";
import style from "../ownerPages/OwnerProfile.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateStallProfile from "../ownerComponents/CreateStallProfile";

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const OwnerStallProfile = () => {
	const navigate = useNavigate();

	const { authData } = useOwnerAuth();

	const [isStallProfile, setIsStallProfile] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [stallProfile, setStallProfile] = useState(null);

	const HandleEditProfile = () => { navigate("/ownerEditProfile"); };
	
	const HandleOrderQueue = () => { navigate('/ownerOrderQueue'); }

	const handleMenuEdit = () => { navigate("/ownerStallMenu"); };

	const HandleHistory = () => { navigate("/ownerOrderHistory"); }

	useEffect(() => {
        const isStallProfileAuth = async () => {
            try {
                const response = await axios.get(`${BACK_END_BASE_URL}/dashboard/stallowner/${authData.ownerData.ownerID}/profile`, { 
					withCredentials: true, 
					headers: { "Cache-Control": "no-store", Pragma: "no-cache" } 
				});
				setStallProfile(response.data.profile);
				setIsStallProfile(true);
				setIsLoading(false);
            } catch (error) {
				setIsStallProfile(false);
                setIsLoading(false);
            }
        };
        isStallProfileAuth();
    }, []);

	if (isLoading === true) {
		return <Loading/>;
	}

	return isStallProfile ? (
		<div className="container-fluid">
				<div className="container-fluid mt-5">
					<div className={`row ${style.content}`}>
						<div className="col-7 d-flex flex-column justify-content-center">
							<div className="container d-flex justify-content-center align-items-center border rounded-pill mb-2" style={{ height: "45px" }}>
								<p className="mb-0 me-3">{stallProfile.owner_profile.full_name}</p>
								<i onClick={HandleEditProfile}>{PEN_ICON}</i>
							</div>
							
							<div className="container d-flex justify-content-center align-items-center border-0 rounded-pill my-2" style={{ height: "45px", backgroundColor: "#2B964F" }}>
								{STAR_ICON}
								<div className="ms-2">10 Reviews</div>
							</div>
						</div>

						<div className="col-5 border-0">
							<img className="img-fluid" src={stallProfile.owner_profile.profile_photo} alt="user-picture"/>
						</div>
					</div>
				</div>

				<div className="container-fluid mt-5 ">
					<div className="row d-flex justify-content-around">
						<div onClick={handleMenuEdit} className="col d-flex mx-1 flex-column justify-content-center border-0 align-items-center" style={{ height: "120px", backgroundColor: "black", borderRadius: "15px" }}>
							<i className="mt-3">{STALL_ICON}</i>
							<p className="text-white fw-bold mt-2">Your Stall</p>
						</div>

						<div onClick={HandleOrderQueue} className="col d-flex mx-1 flex-column justify-content-center border-0 align-items-center" style={{ height: "120px", backgroundColor: "black", borderRadius: "15px" }}>
							<i className="mt-3">{QUEUE_ICON}</i>
							<p className="text-white fw-bold ">Queue</p>
						</div>

						<div onClick={HandleHistory} className="col d-flex mx-1 flex-column justify-content-center border-0 align-items-center" style={{ height: "120px", backgroundColor: "black", borderRadius: "15px" }}>
							<i className="mt-3">{HISTORY_ICON}</i>
							<p className="text-white fw-bold ">History</p>
						</div>
					</div>
				</div>

				<div className={`container-fluid my-3 pt-2 bg-black  text-white  mx-0 pb-2 border-0 rounded ${style.mockup}`}>
					<h5>General</h5>
					<div className="d-flex justify-content-between">
						<span> <p>Favorites</p> </span>
						<span> <p>&gt;</p> </span>
					</div>
					<hr/> 
						<div className="d-flex justify-content-between"> 
							<span> <p>Settings</p> </span>
							<span> <p>&gt;</p> </span>
						</div>
					<hr/>

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
			) : (<CreateStallProfile/>) 
};

export default OwnerStallProfile;