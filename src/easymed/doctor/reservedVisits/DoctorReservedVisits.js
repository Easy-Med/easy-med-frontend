import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material";
import ReservedVisitsFilter from "../../generic/reservedVisits/ReservedVisitsFilter";
import SearchBar from "../../../app/navbar/SearchBar";
import DateSort from "../../generic/reservedVisits/DateSort";
import ReservedVisitDoctorCard from "./ReservedVisitDoctorCard";
import PageBox from "../../generic/PageBox";
import { useMutation } from "react-query";
import useAuth from "../../../app/auth/UseAuth";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";
import moment from "moment";

const DoctorReservedVisits = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const auth = useAuth();
  const { id, role } = auth.authData;
  const [dateSortValue, setDateSortValue] = useState("");

  const reservedVisitsMutation = useMutation(`${role}Visits`, (filters) =>
    ReservedVisitsService.getReservedVisitsForDoctor(id, filters)
  );

  useEffect(() => {
    reservedVisitsMutation.mutate({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDateSortChange = (e) => {
    setDateSortValue(e.target.value);
    switch (e.target.value) {
      case "oldest":
        reservedVisitsMutation.data.sort((a, b) => {
          return moment(a.startDate).diff(moment(b.startDate));
        });
        break;
      case "latest":
        reservedVisitsMutation.data.sort((a, b) => {
          return -moment(a.startDate).diff(moment(b.startDate));
        });
        break;
      default:
        break;
    }
  };

  const applyFilters = (filterOptions) => {
    reservedVisitsMutation.mutate(filterOptions);
    setDateSortValue("");
  };

  const resetFilters = () => {
    reservedVisitsMutation.mutate({});
    setDateSortValue("");
  };

  return (
    <PageBox sx={{ px: { xs: 2 } }}>
      <Box
        display={"flex"}
        flexDirection={matchesMobile ? "column" : "row"}
        gap={2}
      >
        <ReservedVisitsFilter
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          flex={1}
        >
          <SearchBar sx={{ border: "1px solid grey" }} />
          <DateSort
            sx={{ my: 2 }}
            value={dateSortValue}
            onChange={onDateSortChange}
          />
          <Box display={"flex"} flexDirection={"column"} width={"100%"} gap={2}>
            {reservedVisitsMutation.isLoading && (
              <Typography variant={"h5"}>Loading...</Typography>
            )}
            {reservedVisitsMutation.isError && (
              <Typography variant={"h5"}>
                Can't load reserved visits :/. Try again later!
              </Typography>
            )}
            {reservedVisitsMutation.isSuccess &&
              reservedVisitsMutation.data.length === 0 && (
                <Typography variant={"h4"}>
                  No reserved visits. Go and persuade some patients for a visit
                  with you! 🍀
                </Typography>
              )}
            {reservedVisitsMutation.isSuccess &&
              reservedVisitsMutation.data.length !== 0 &&
              reservedVisitsMutation.data.map((reservedVisit) => (
                <ReservedVisitDoctorCard
                  key={reservedVisit.id}
                  reservedVisit={reservedVisit}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </PageBox>
  );
};

export default DoctorReservedVisits;
