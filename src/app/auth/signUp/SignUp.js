import React from "react";
import { Container } from "@mui/material";
import SignUpForm from "./SignUpForm";
import SignUpLabel from "./SignUpLabel";
import { motion } from "framer-motion";

const SignUp = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 4,
      }}
    >
      <motion.div
        whileInView={{ y: [-50, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <SignUpLabel />
      </motion.div>
      <SignUpForm />
    </Container>
  );
};

export default SignUp;
