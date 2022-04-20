import React from "react";
import useAuth from "./UseAuth";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, role }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.authData) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (auth.authData.role.toLowerCase() !== role) {
    auth.signOut();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;