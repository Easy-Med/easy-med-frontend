import React from "react";
import useAuth from "./UseAuth";
import { Navigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

const RequireAuth = ({ children, role }) => {
  const auth = useAuth();
  const location = useLocation();

  const isTokenExpired = () => {
    const { accessToken } = auth.authData;
    const decodedToken = jwtDecode(accessToken);

    return decodedToken.exp * 1000 < new Date().getTime();
  };

  const isWrongRole = () => {
    return auth.authData.role.toLowerCase() !== role;
  };

  if (!auth.authData) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  if (isTokenExpired() || isWrongRole()) {
    auth.signOut();
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
