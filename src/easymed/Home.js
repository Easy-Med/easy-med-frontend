import React from "react";
import useAuth from "../app/auth/UseAuth";
import { Navigate } from "react-router-dom";

const Home = () => {
  const auth = useAuth();
  const authData = auth.authData;

  if (authData) {
    return <Navigate to={`/${authData.role.toLowerCase()}`} replace />;
  }

  return <Navigate to={"/signIn"} replace />;
};

export default Home;