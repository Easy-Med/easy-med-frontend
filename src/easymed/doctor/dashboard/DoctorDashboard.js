import React from "react";
import { Box, Typography } from "@mui/material";
import DailyTile from "./DailyTile";

const DoctorDashboard = () => {
  return (
    <Box sx={{ py: 2, px: 5 }}>
      <Typography
        fontWeight={"bold"}
        sx={{ color: "text.secondary" }}
        variant={"h6"}
      >
        Daily info
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        gap={2}
        paddingY={2}
        flexWrap={"wrap"}
      >
        <DailyTile
          name={"Remaining visits"}
          value={7}
          bgColor={"0, 200, 0"}
          iconImgUrl={"/images/doctor/dashboard/calendar-icon.png"}
        />
        <DailyTile
          name={"End of work at"}
          value={"18:30"}
          bgColor={"0, 170, 255"}
          iconImgUrl={"/images/doctor/dashboard/work-icon.png"}
        />
        <DailyTile
          name={"Issued prescriptions"}
          value={3}
          bgColor={"224, 4, 0"}
          iconImgUrl={"/images/doctor/dashboard/prescriptions-icon.png"}
        />
        <DailyTile
          name={"Current rating"}
          value={"4,32/5"}
          bgColor={"242, 230, 0"}
          iconImgUrl={"/images/doctor/dashboard/stars-icon.png"}
        />
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
