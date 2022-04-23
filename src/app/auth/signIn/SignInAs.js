import React from "react";
import SignInAd from "./SignInAd";
import { Box, useMediaQuery } from "@mui/material";
import SignInForm from "./SignInForm";
import { useTheme } from "@emotion/react";
import SignInLabel from "./SignInLabel";

const SignInAs = ({ imgUrl, imgAlt, role, ...props }) => {
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        pt: 5,
        pb: matchesDesktop ? 0 : 5,
        px: matchesDesktop ? 18 : 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {matchesDesktop && (
        <>
          <SignInAd imgUrl={imgUrl} imgAlt={imgAlt} />
          <Box sx={{ flex: "1", minWidth: "50px" }} />
        </>
      )}
      <Box
        sx={{
          mt: matchesDesktop ? 10 : 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {!matchesDesktop && <SignInLabel />}
        <SignInForm role={role} />
      </Box>
    </Box>
  );
};

export default SignInAs;
