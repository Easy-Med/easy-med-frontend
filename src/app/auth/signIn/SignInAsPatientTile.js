import React from "react";
import SignInAsTile from "./SignInAsTile";
import { motion } from "framer-motion";

const SignInAsPatientTile = () => {
  return (
    <motion.div
      whileInView={{ y: [100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, delay: 0.05 }}
      style={{ opacity: 0 }}
    >
      <SignInAsTile
        title={"Patient"}
        imgUrl={"/images/patient/patient-signIn-icon.png"}
        imgAlt={"patient-image-tile"}
        redirectUrl={"/signIn/patient"}
      />
    </motion.div>
  );
};

export default SignInAsPatientTile;
