// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('user');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // You can add additional checks here (like token expiration)
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
