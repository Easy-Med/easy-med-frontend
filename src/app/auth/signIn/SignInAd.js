import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import SignInLabel from "./SignInLabel";

const SignInAd = ({ imgUrl, imgAlt, ...props }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <SignInLabel />
      <div style={{ height: "100%" }} />
      <motion.img
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        src={imgUrl}
        alt={imgAlt}
        style={{ width: "480px", opacity: 0 }}
      />
    </Box>
  );
};

export default SignInAd;
