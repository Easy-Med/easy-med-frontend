import React from "react";
import { Box, Typography } from "@mui/material";
import DailyTile from "./DailyTile";
import { useQuery } from "react-query";
import DashboardService from "../../../app/api/DashboardService";
import useAuth from "../../../app/auth/UseAuth";
import moment from "moment";

const DailyInfo = () => {
  const auth = useAuth();
  const { id } = auth.authData;
  const dailyInfoQuery = useQuery("dailyInfo", () =>
    DashboardService.getDailyInfoForDoctor(id)
  );

  return (
    <>
      <Typography
        fontWeight={"bold"}
        sx={{ color: "text.secondary" }}
        variant={"h5"}
      >
        Daily info
      </Typography>
      {dailyInfoQuery.isError && (
        <Typography variant={"h5"}>
          Can't load daily info. Try again later!
        </Typography>
      )}
      {dailyInfoQuery.isLoading && (
        <Typography variant={"h6"}>Loading daily info...</Typography>
      )}
      {dailyInfoQuery.isSuccess && (
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          gap={2}
          py={2}
          flexWrap={"wrap"}
        >
          <DailyTile
            name={"Remaining visits"}
            value={dailyInfoQuery.data.remainingVisits}
            bgColor={"0, 200, 0"}
            iconImgUrl={"/images/doctor/dashboard/calendar-icon.png"}
          />
          <DailyTile
            name={"End of work at"}
            value={
              dailyInfoQuery.data.endOfWorkAt
                ? moment(dailyInfoQuery.data.endOfWorkAt).format("HH:mm")
                : "Finished"
            }
            bgColor={"0, 170, 255"}
            iconImgUrl={"/images/doctor/dashboard/work-icon.png"}
          />
          <DailyTile
            name={"Issued prescriptions"}
            value={dailyInfoQuery.data.issuedPrescriptions}
            bgColor={"224, 4, 0"}
            iconImgUrl={"/images/doctor/dashboard/prescriptions-icon.png"}
          />
          <DailyTile
            name={"Current rating"}
            value={
              dailyInfoQuery.data.currentRating
                ? dailyInfoQuery.data.currentRating
                : "Not rated"
            }
            bgColor={"242, 230, 0"}
            iconImgUrl={"/images/doctor/dashboard/stars-icon.png"}
          />
        </Box>
      )}
    </>
  );
};

export default DailyInfo;
