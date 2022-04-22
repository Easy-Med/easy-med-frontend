import React, { useState } from "react";
import UserService from "../api/UserService";
import AuthContext from "./AuthContext";
import { getStorageItem, setStorageItem } from "../utils/storage";

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(getStorageItem("authData"));

  const handleResponse = (response) => {
    const { data } = response;
    data.role = data.role.toLowerCase();
    setAuthData(data);
    setStorageItem("authData", data);

    return data;
  };

  const signIn = (formData) => {
    return UserService.signIn(formData, {
      onSuccess: handleResponse,
    });
  };

  const signUp = (formData) => {
    return UserService.signUp(formData, {
      onSuccess: handleResponse,
    });
  };

  const signOut = () => {
    setAuthData(null);
    setStorageItem("authData", null);
  };

  const value = { authData, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;