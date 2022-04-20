import React from "react";
import LoginAs from "./LoginAs";

const LoginAsPatient = () => {
  return (
    <LoginAs
      role={"patient"}
      imgUrl={"/images/patient/patient-login-screen.png"}
      imgAlt={"patient-login-screen"}
    />
  );
};

export default LoginAsPatient;
