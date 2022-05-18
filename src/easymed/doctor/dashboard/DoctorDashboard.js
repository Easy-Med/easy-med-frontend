import React from "react";
import { Box, Typography } from "@mui/material";
import DailyTile from "./DailyTile";
import PageBox from "../../generic/PageBox";
import GeneralTile from "./GeneralTile";
import VisitTile from "./VisitTile";

const DoctorDashboard = () => {
  return (
    <PageBox>
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
        width={"100%"}
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
      <Typography
        fontWeight={"bold"}
        sx={{ color: "text.secondary" }}
        variant={"h6"}
      >
        General info
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        gap={2}
        paddingY={2}
        flexWrap={"wrap"}
      >
        <GeneralTile value={"Visits"}>
          <VisitTile
            hour={"13:00"}
            firstName={"Zbigniew"}
            lastName={"Kaniecki"}
            pesel={"00230305789"}
          />
          <VisitTile
            hour={"14:00"}
            firstName={"Aneta"}
            lastName={"Ławska"}
            pesel={"01457898123"}
          />
          <VisitTile
            hour={"15:00"}
            firstName={"Ola"}
            lastName={"Kabzuła"}
            pesel={"01457898123"}
          />
          <VisitTile
            hour={"16:00"}
            firstName={"Ola"}
            lastName={"Kabzuła"}
            pesel={"01457898123"}
          />
          <VisitTile
            hour={"17:00"}
            firstName={"Ola"}
            lastName={"Kabzuła"}
            pesel={"01457898123"}
          />
        </GeneralTile>
        <GeneralTile value={"Booking calendar"}></GeneralTile>
      </Box>
    </PageBox>
  );
};

export default DoctorDashboard;
