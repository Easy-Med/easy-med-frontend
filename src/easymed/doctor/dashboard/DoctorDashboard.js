import React from "react";
import {Box, Typography} from "@mui/material";
import DailyTile from "./DailyTile";

const DoctorDashboard = () => {
  return (
    <Box sx={{py: 2, px: 5}}>
      <Typography fontWeight={"bold"} sx={{color: 'text.secondary'}} variant={"h6"}>Daily info</Typography>
      <Box display={"flex"} justifyContent={"space-between"} gap={2} paddingY={2} flexWrap={"wrap"}>
        <DailyTile />
        <DailyTile />
        <DailyTile />
        <DailyTile />
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
