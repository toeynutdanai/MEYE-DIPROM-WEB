import { jwtDecode } from "jwt-decode"; // Ensure correct import
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import session from "utils/session";
import api from "lib/api";

const PrivateRoute = ({ element }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // Set initial state to null

    const isTokenExpired = useCallback(() => {
        const token = session.getAuthToken();
        if (token === null) {
            return true;
        }
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            return true;
        }
    }, []);

    const logoutIfTokenExpired = useCallback(async () => {
        if (isTokenExpired()) {
            if(await api.refresh() ===''){
                session.removeAuthToken();
                setIsLoggedIn(false);
            }else{
                setIsLoggedIn(true);
            }
        } else {
            setIsLoggedIn(true);
        }
    }, [isTokenExpired]);

    useEffect(() => {
        logoutIfTokenExpired();
    }, [logoutIfTokenExpired]);

    if (isLoggedIn === null) {
        return null;
    }

    return isLoggedIn ? element : <Navigate to="/sign_in" />;
};

export default PrivateRoute;
