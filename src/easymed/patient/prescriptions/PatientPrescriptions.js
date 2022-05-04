import React from "react";
import PrescriptionCard from "./PrescriptionCard";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const PatientPrescriptions = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ m: 2, flex: 1 }}>
      <Box display={"flex"} gap={2} flexWrap={"wrap"} sx={{ mb: 2 }}>
        <PrescriptionCard
          sx={matchesMobile ? { width: "100%" } : { maxWidth: "250px" }}
        />
        <PrescriptionCard
          sx={matchesMobile ? { width: "100%" } : { maxWidth: "250px" }}
        />
        <PrescriptionCard
          sx={matchesMobile ? { width: "100%" } : { maxWidth: "250px" }}
        />
        <PrescriptionCard
          sx={matchesMobile ? { width: "100%" } : { maxWidth: "250px" }}
        />
        <PrescriptionCard
          sx={matchesMobile ? { width: "100%" } : { maxWidth: "250px" }}
        />
        <PrescriptionCard
          sx={matchesMobile ? { width: "100%" } : { maxWidth: "250px" }}
        />
        <PrescriptionCard
          sx={matchesMobile ? { width: "100%" } : { maxWidth: "250px" }}
        />
        <PrescriptionCard
          sx={matchesMobile ? { width: "100%" } : { maxWidth: "250px" }}
        />
      </Box>
    </Box>
  );
};

export default PatientPrescriptions;
