import React from "react";
import Box from "@mui/material/Box";
import {
  CircularProgress,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";
import useAuth from "../../../app/auth/UseAuth";
import moment from "moment";
import { useTheme } from "@emotion/react";

const VisitTile = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const VisitsWidget = () => {
  const auth = useAuth();
  const { id } = auth.authData;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const reservedVisitsQuery = useQuery("doctorVisits", () =>
    ReservedVisitsService.getReservedVisitsFor("doctor", id, {})
  );

  const filterOnlyTodayVisits = (visit) => {
    return moment(visit.startDate).isSame(Date.now(), "day");
  };

  return (
    <Paper sx={{ width: "100%", p: 2 }}>
      <Typography
        textAlign={"center"}
        fontWeight={"bold"}
        gutterBottom
        variant={"h5"}
      >
        Visits
      </Typography>
      <Divider />
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        {reservedVisitsQuery.isLoading && <CircularProgress sx={{ mt: 1 }} />}
        {reservedVisitsQuery.isError && (
          <Typography variant={"h5"}>Can't load visits</Typography>
        )}
        {reservedVisitsQuery.isSuccess &&
          reservedVisitsQuery.data.filter((visit) =>
            filterOnlyTodayVisits(visit)
          ).length === 0 && (
            <Typography variant={"h6"} mt={1}>
              No visits for today! See you tomorrow 😊
            </Typography>
          )}
        {reservedVisitsQuery.isSuccess &&
          reservedVisitsQuery.data.filter((visit) =>
            filterOnlyTodayVisits(visit)
          ).length !== 0 &&
          reservedVisitsQuery.data
            .filter((visit) => filterOnlyTodayVisits(visit))
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            .map((visit) => (
              <VisitTile key={visit.id}>
                <Box display={"flex"}>
                  <Typography fontWeight={"bold"} variant={"h5"}>
                    {moment(visit.startDate).format("HH:mm")}
                  </Typography>
                  {!matchesMobile && (
                    <>
                      {moment(visit.startDate).isSameOrBefore(Date.now()) ? (
                        <Typography
                          color={"error"}
                          variant={"caption"}
                          mt={-1}
                          ml={0.5}
                        >
                          +
                          {moment(visit.startDate).diff(
                            moment(Date.now()),
                            "minutes"
                          )}{" "}
                          min
                        </Typography>
                      ) : (
                        <Typography
                          sx={{ color: "grey.600" }}
                          variant={"caption"}
                          mt={-1}
                          ml={0.5}
                        >
                          On time
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                  gap={1}
                  m={1}
                >
                  <Typography textAlign={"center"} variant={"body1"}>
                    {visit.patient.firstName}
                    <strong>{visit.patient.lastName}</strong>
                  </Typography>
                  <Typography textAlign={"center"} variant={"body2"}>
                    Pesel:{" "}
                    <strong>
                      {visit.patient.personalIdentityNumber
                        ? visit.patient.personalIdentityNumber
                        : "Unknown"}
                    </strong>
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                  gap={1}
                >
                  <IconButton
                    size={"small"}
                    sx={{ height: "40px", width: "40px" }}
                    color={"success"}
                  >
                    <img
                      width={"40px"}
                      height={"auto"}
                      src={"/images/others/done-icon.png"}
                      alt={""}
                    />
                  </IconButton>
                  <IconButton
                    size={"small"}
                    sx={{ height: "40px", width: "40px" }}
                    color={"info"}
                  >
                    <img
                      width={"40px"}
                      height={"auto"}
                      src={"/images/others/info-icon.png"}
                      alt={""}
                    />
                  </IconButton>
                </Box>
              </VisitTile>
            ))}
      </Box>
    </Paper>
  );
};

export default VisitsWidget;