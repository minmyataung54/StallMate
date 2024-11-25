import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookieAuth } from "../hooks/useCookieAuth";
import axios from "axios";
import Loading from "../Loading";

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const API_ENDPOINTS = {
	Customer: `${BACK_END_BASE_URL}/dashboard/customer`,
	StallOwner: `${BACK_END_BASE_URL}/dashboard/stallowner`,
};

const RootProtectedRoute = ({ children }) => {
	const { getRole } = useCookieAuth();
	const [ isAuthenticated, setIsAuthenticated ] = useState(null); 
	const [ redirectPath, setRedirectPath ] = useState(null); 

	useEffect(() => {
		const checkAuth = async () => {
			const role = getRole(); 
			// console.log("Role from getRole():", role);

			if (!role) {
				// console.log("No role found. Setting isAuthenticated to false.");
				setIsAuthenticated(false);
				return;
			}

			try {
				const endpoint = API_ENDPOINTS[role];
				if (!endpoint) {
					// console.error("Invalid role, no endpoint found.");
					setIsAuthenticated(false);
					return;
				}

				const response = await axios.get(endpoint, { withCredentials: true, headers: { "Cache-Control": "no-store", Pragma: "no-cache" } });
				// console.log("Backend Response:", response);

				if (response.status === 200 && response.data.userType === role) {
					setIsAuthenticated(true);
					setRedirectPath(role === "Customer" ? "/clientHome" : "/ownerStallProfile");
				} else {
					setIsAuthenticated(false); 
				}
			} catch (error) {
				if (error.response?.status === 401) {
					// console.error("Unauthorized access (401). Setting isAuthenticated to false.");
				} else {
					// console.error("Error during authentication check:", error.message);
				}
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	console.log("redirectPath:", redirectPath);
	console.log("isAuthenticated:", isAuthenticated);

	if (isAuthenticated === null) {
		return <Loading />;
	}

	if (isAuthenticated && redirectPath) {
		// console.log("Redirecting to:", redirectPath);
		return <Navigate to = { redirectPath } replace />;
	}

	if (!isAuthenticated) {
		// console.log("User is not authenticated, rendering children.");
		return children;
	}

	return null;
};

export default RootProtectedRoute;