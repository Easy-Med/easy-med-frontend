import React, {useState} from "react";
import Box from "@mui/material/Box";
import {useTheme} from "@emotion/react";
import {useMediaQuery} from "@mui/material";
import ReservedVisitsFilter from "../../generic/reservedVisits/ReservedVisitsFilter";
import SearchBar from "../../../app/navbar/SearchBar";
import DateSort from "../../generic/reservedVisits/DateSort";
import ReservedVisitDoctorCard from "./ReservedVisitDoctorCard";

const DoctorReservedVisits = () => {
  const theme = useTheme()
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

  const resetFilters = () => {
    console.log("Remove filters");
  };

  return (
    <Box sx={{ flex: 1, p: 2 }}>
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
            <ReservedVisitDoctorCard completed={"no"} />
            <ReservedVisitDoctorCard completed={"yes"} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default DoctorReservedVisits;
