import React from "react";
import LoginAsTile from "./LoginAsTile";
import { motion } from "framer-motion";

const LoginAsDoctorTile = () => {
  return (
    <motion.div
      whileInView={{ y: [100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      style={{ opacity: 0 }}
    >
      <LoginAsTile
        title={"Doctor"}
        imgUrl={"/images/doctor/doctor-login-icon.png"}
        imgAlt={"doctor-image-tile"}
        redirectUrl={"/login/doctor"}
      />
    </motion.div>
  );
};

export default LoginAsDoctorTile;