import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import IssuePrescriptionForm from "./IssuePrescriptionForm";

const DoctorPrescriptions = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      p={2}
      gap={2}
    >
      <Typography variant={"h4"} color={"text.secondary"}>
        Issue a prescription
      </Typography>
      <IssuePrescriptionForm sx={{ width: "100%" }} />
      <Typography variant={"h4"} color={"text.secondary"}>
        Issued prescriptions
      </Typography>
    </Box>
  );
};

export default DoctorPrescriptions;
