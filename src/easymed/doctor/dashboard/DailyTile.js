import React from 'react';
import {Paper, Typography, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {useTheme} from "@emotion/react";

const TileIcon = styled("img")(({ theme }) => ({
  padding: theme.spacing(1),
  border: '2px solid green',
  backgroundColor: 'lightGreen',
  borderRadius: '50%'
}));

const DailyTile = ({name, value, iconImgUrl, bgColor, ...props}) => {
  const theme = useTheme()
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Paper sx={{px: 2, py: 3, display: 'flex', alignItems: 'center', gap: 2, flex: matchesMobile ? "1": "0 1 auto"}}>
      <TileIcon src={"/images/doctor/dashboard/calendar-icon.png"} alt={""} />
      <Box>
        <Typography fontWeight={"bold"}>7</Typography>
        <Typography sx={{color: "text.secondary"}} variant={"body2"}>Remaining visits</Typography>
      </Box>
    </Paper>
  );
};

export default DailyTile;