import React from "react";
import LoginAsTile from "./LoginAsTile";
import { motion } from "framer-motion";

const LoginAsPatientTile = () => {
  return (
    <motion.div
      whileInView={{ y: [100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, delay: 0.05 }}
      style={{ opacity: 0 }}
    >
      <LoginAsTile
        title={"Patient"}
        imgUrl={"/images/patient/patient-login-icon.png"}
        imgAlt={"patient-image-tile"}
        redirectUrl={"/login/patient"}
      />
    </motion.div>
  );
};

export default LoginAsPatientTile;
