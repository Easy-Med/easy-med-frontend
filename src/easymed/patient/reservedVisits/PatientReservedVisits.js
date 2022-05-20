import React, { useState } from "react";
import Box from "@mui/material/Box";
import ReservedVisitsFilter from "../../generic/reservedVisits/ReservedVisitsFilter";
import SearchBar from "../../../app/navbar/SearchBar";
import ReservedVisitPatientCard from "./ReservedVisitPatientCard";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import ReservedVisitsSorting from "../../generic/reservedVisits/ReservedVisitsSorting";
import PageBox from "../../generic/PageBox";

const PatientReservedVisits = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [dateSortValue, setDateSortValue] = useState("");

  const onDateSortChange = (e) => {
    setDateSortValue(e.target.value);
    console.log(e.target.value);
  };

  const applyFilters = (filterOptions) => {
    console.log("Filter reserved visits!");
    console.log(filterOptions);
  };

  const resetFilters = (e) => {
    console.log("Remove filters");
  };

  return (
    <PageBox sx={{ px: { xs: 2 } }}>
      <Box
        width={"100%"}
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
          <ReservedVisitsSorting
            sx={{ my: 2 }}
            value={dateSortValue}
            onChange={onDateSortChange}
          />
          <Box display={"flex"} flexDirection={"column"} width={"100%"} gap={2}>
            <ReservedVisitPatientCard />
            <ReservedVisitPatientCard />
          </Box>
        </Box>
      </Box>
    </PageBox>
  );
};

export default PatientReservedVisits;
