import React from "react";
import SignInAsTile from "./SignInAsTile";
import { motion } from "framer-motion";

const SignInAsDoctorTile = () => {
  return (
    <motion.div
      whileInView={{ y: [100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      style={{ opacity: 0 }}
    >
      <SignInAsTile
        title={"Doctor"}
        imgUrl={"/images/doctor/doctor-signIn-icon.png"}
        imgAlt={"doctor-image-tile"}
        redirectUrl={"/signIn/doctor"}
      />
    </motion.div>
  );
};

export default SignInAsDoctorTile;
