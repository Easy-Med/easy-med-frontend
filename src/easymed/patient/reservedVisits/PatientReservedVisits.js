import React from "react";
import Box from "@mui/material/Box";
import ReservedVisitsFilter from "./ReservedVisitsFilter";
import SearchBar from "../../../app/navbar/SearchBar";
import ReservedVisitCard from "./ReservedVisitCard";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const PatientReservedVisits = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <Box
        display={"flex"}
        flexDirection={matchesMobile ? "column" : "row"}
        gap={2}
      >
        <ReservedVisitsFilter />
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          flex={1}
        >
          <SearchBar sx={{ border: "1px solid grey" }} />
          <Box>Date - latest</Box>
          <Box display={"flex"} flexDirection={"column"} width={"100%"} gap={2}>
            <ReservedVisitCard />
            <ReservedVisitCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientReservedVisits;
