import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material";
import ReservedVisitsFilter from "./ReservedVisitsFilter";
import SearchBar from "../../../app/navbar/SearchBar";
import ReservedVisitsSorting from "./ReservedVisitsSorting";
import ReservedVisitCard from "./ReservedVisitCard";
import PageBox from "../PageBox";
import { useQuery } from "react-query";
import useAuth from "../../../app/auth/UseAuth";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { decodeQueryParamsForReservedVisits } from "../../../app/utils/serializeQueryParamsUtils";

const ReservedVisits = () => {
  const auth = useAuth();
  const { id, role } = auth.authData;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const sortReservedVisits = (visits) => {
    switch (sort) {
      case "oldest":
        visits.sort((a, b) => {
          return moment(a.startDate).diff(moment(b.startDate));
        });
        break;
      case "latest":
        visits.sort((a, b) => {
          return -moment(a.startDate).diff(moment(b.startDate));
        });
        break;
      default:
        break;
    }
  };

  const reservedVisitsQuery = useQuery(
    [`${role}Visits`, filters, sort],
    () => ReservedVisitsService.getReservedVisitsFor(role, id, filters),
    {
      onSuccess: sortReservedVisits,
    }
  );

  useEffect(() => {
    setFilters(decodeQueryParamsForReservedVisits(searchParams));
    setSort(searchParams.get("sort"));
  }, [searchParams]);

  useEffect(() => {
    reservedVisitsQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort]);

  return (
    <PageBox sx={{ px: { xs: 2 } }}>
      <Box
        display={"flex"}
        flexDirection={matchesMobile ? "column" : "row"}
        gap={2}
        width={"100%"}
      >
        <ReservedVisitsFilter />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          flex={1}
        >
          <SearchBar sx={{ border: "1px solid grey" }} />
          <ReservedVisitsSorting sx={{ my: 2 }} />
          <Box display={"flex"} flexDirection={"column"} width={"100%"} gap={2}>
            {reservedVisitsQuery.isLoading && (
              <Typography variant={"h5"}>Loading...</Typography>
            )}
            {reservedVisitsQuery.isError && (
              <Typography variant={"h5"}>
                Can't load reserved visits :/. Try again later!
              </Typography>
            )}
            {reservedVisitsQuery.isSuccess &&
              reservedVisitsQuery.data.length === 0 && (
                <Typography variant={"h4"}>
                  {role === "patient" &&
                    "No reserved visits? Go and reserve one! 🎠"}
                  {role === "doctor" &&
                    "No reserved visits. Go and persuade some patients for a visit with you! 🍀"}
                </Typography>
              )}
            {reservedVisitsQuery.isSuccess &&
              reservedVisitsQuery.data.length !== 0 &&
              reservedVisitsQuery.data.map((reservedVisit) => (
                <ReservedVisitCard
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

export default ReservedVisits;
