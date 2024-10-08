import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import VisitsWidget from "./VisitsWidget";
import BookingCalendarWidget from "./BookingCalendarWidget";

const GeneralInfo = () => {
  return (
    <>
      <Typography
        fontWeight={"bold"}
        sx={{ color: "text.secondary", mb: 2 }}
        variant={"h5"}
      >
        General info
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, sm: 5, md: 8 },
          height: { xs: "auto", md: "100%" },
        }}
      >
        <VisitsWidget />
        <BookingCalendarWidget />
      </Box>
    </>
  );
};

export default GeneralInfo;
