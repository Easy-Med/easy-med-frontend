import React from "react";
import LoginAs from "./LoginAs";

const LoginAsDoctor = () => {
  return (
    <LoginAs
      role={"doctor"}
      imgUrl={"/images/doctor/doctor-login-screen.png"}
      imgAlt={"doctor-login-screen"}
    />
  );
};

export default LoginAsDoctor;
