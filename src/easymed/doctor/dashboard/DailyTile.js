import React from "react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";

const TileIcon = styled("img")(({ theme }) => ({
  padding: theme.spacing(1),
  borderWidth: "2px",
  borderStyle: "solid",
  borderRadius: "50%",
  borderColor: "grey",
  backgroundColor: "lightGrey",
  boxShadow: theme.shadows["3"],
  width: '64px',
  height: '64px'
}));

const DailyTile = ({ name, value, iconImgUrl, bgColor, ...props }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        px: 2,
        py: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        flex: matchesMobile ? "1" : "0 1 auto",
      }}
    >
      <TileIcon
        src={iconImgUrl}
        alt={""}
        sx={{
          borderColor: `rgba(${bgColor}, 1.0)`,
          backgroundColor: `rgba(${bgColor}, 0.5)`,
        }}
      />
      <Box>
        <Typography variant={"h5"} fontWeight={"bold"}>
          {value}
        </Typography>
        <Typography sx={{ color: "text.secondary" }} variant={"body2"}>
          {name}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DailyTile;