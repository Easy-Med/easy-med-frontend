import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginLabel = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      animate={{ y: [100, 0], opacity: [0.9, 1] }}
      whileHover={{ opacity: 0.9 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate("/login")}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Typography color={"primary"} variant={"h1"} fontWeight={"bold"}>
        EasyMed
      </Typography>
      <Typography variant={"h5"} sx={{ color: "text.secondary" }}>
        Take care of yourself
      </Typography>
    </motion.div>
  );
};

export default LoginLabel;