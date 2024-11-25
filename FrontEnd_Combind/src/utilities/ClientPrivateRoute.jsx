import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useClientAuth } from './ClientAuthContext';
import { useCookieAuth } from "../hooks/useCookieAuth";
import axios from 'axios';
import Loading from "../Loading";

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const ClientPrivateRoute = () => {
    const { getRole } = useCookieAuth();
    const { setAuthData } = useClientAuth();
    const [ isAuthenticated, setIsAuthenticated ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const role = getRole(); 
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${BACK_END_BASE_URL}/dashboard/customer`, { 
                    withCredentials: true, 
                    headers: { "Cache-Control": "no-store", Pragma: "no-cache" } 
                });
                if (response.status === 200 && response.data.clientID && response.data.userType === role) {
                    setIsAuthenticated(true);
                    setAuthData({ clientData: response.data, clientCurrentPath: location.pathname });
                    setIsLoading(false);
                } else {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [location.pathname]);
    
    if (isLoading === true) {
        return <Loading/>;
    }

    return isAuthenticated ? (<Outlet/>) : (<Navigate to="/" replace state = {{ from: location }}/>);
};

export default ClientPrivateRoute;