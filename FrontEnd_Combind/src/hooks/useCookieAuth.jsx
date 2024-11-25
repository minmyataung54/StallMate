import { useCookies } from "react-cookie";
  
export const useCookieAuth = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["role"]); 
  
	const setRole = (role) => {
		setCookie("role", role, { path: "/", maxAge: 3600 }); // Save role cookie (1 hour)
	};
  
	const clearRole = () => {
	  	removeCookie("role", { path: "/" }); // Remove the role cookie
	};
  
	const getRole = () => cookies.role; // Retrieve the role cookie
  
	return { setRole, clearRole, getRole, cookies };
};