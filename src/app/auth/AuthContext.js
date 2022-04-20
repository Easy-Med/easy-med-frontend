import React from "react";

const AuthContext = React.createContext({
  authData: null,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
});

export default AuthContext;