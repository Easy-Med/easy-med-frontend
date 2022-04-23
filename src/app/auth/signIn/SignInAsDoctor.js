import React from "react";
import SignInAs from "./SignInAs";

const SignInAsDoctor = () => {
  return (
    <SignInAs
      role={"doctor"}
      imgUrl={"/images/doctor/doctor-signIn-screen.png"}
      imgAlt={"doctor-signIn-screen"}
    />
  );
};

export default SignInAsDoctor;
