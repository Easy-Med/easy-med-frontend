import { Divider, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";

function GeneralTile({ children, value, ...props }) {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        px: 2,
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        flex: matchesMobile ? "1" : "0 1 auto",
        width: "49%",
        minWidth: "245px",
      }}
    >
      <Typography variant={"h5"} fontWeight={"bold"}>
        {value}
      </Typography>
      <Divider sx={{ width: "100%" }}></Divider>
      <Box
        sx={{
          width: "100%",
          maxHeight: "400px",
          overflow: "auto"
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

export default GeneralTile;
