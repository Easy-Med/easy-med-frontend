import React from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Typography } from "@mui/material";
import SignInAsDoctorTile from "./SignInAsDoctorTile";
import SignInAsPatientTile from "./SignInAsPatientTile";
import { useNavigate } from "react-router-dom";

const ChooseSignInOption = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        mt: 4,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant={"h1"}
        sx={{ mb: 5 }}
        fontWeight={"bold"}
        color={"primary.main"}
      >
        EasyMed
      </Typography>
      <Typography variant={"h4"}>Sign in as</Typography>
      <Box
        sx={{
          mt: 4,
          mb: 40,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <SignInAsDoctorTile />
        <SignInAsPatientTile />
      </Box>
      <Divider sx={{ width: "25%" }} />
      <Button
        onClick={() => navigate("/signUp")}
        sx={{ color: "text.secondary", mb: 1 }}
      >
        Don't have account? Sign up
      </Button>
    </Box>
  );
};

export default ChooseSignInOption;
