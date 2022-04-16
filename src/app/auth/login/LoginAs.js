import React from "react";
import LoginAd from "./LoginAd";
import { Box, useMediaQuery } from "@mui/material";
import LoginForm from "./LoginForm";
import { useTheme } from "@emotion/react";
import LoginLabel from "./LoginLabel";

const LoginAs = ({ imgUrl, imgAlt, ...props }) => {
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
          <LoginAd imgUrl={imgUrl} imgAlt={imgAlt} />
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
        {!matchesDesktop && <LoginLabel />}
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginAs;
