import React from "react";
import { Box, Typography } from "@mui/material";

const SignUpLabel = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 4,
        gap: 1,
      }}
    >
      <Typography color={"primary"} variant={"h1"}>
        Sign up
      </Typography>
      <Typography variant={"body1"} sx={{ color: "text.secondary" }}>
        Join our health community!
      </Typography>
    </Box>
  );
};

export default SignUpLabel;
