import React from "react";
import { Box, Typography } from "@mui/material";

const PathNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        mt: 4,
      }}
    >
      <Typography variant={"h3"}>Ups! Path not found :(</Typography>
      <img
        alt={"will-smith-slap"}
        src={"/images/others/will-smith-slap.gif"}
        style={{
          boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
          border: "2px solid black",
        }}
      />
    </Box>
  );
};

export default PathNotFound;
