import React from "react";
import { Typography } from "@mui/material";
import IssuePrescriptionForm from "./IssuePrescriptionForm";
import PageBox from "../../generic/PageBox";
import PrescriptionsList from "../../generic/prescriptions/PrescriptionsList";

const DoctorPrescriptions = () => {
  return (
    <PageBox sx={{ gap: 2 }}>
      <Typography variant={"h4"} color={"text.secondary"}>
        Issue a prescription
      </Typography>
      <IssuePrescriptionForm sx={{ width: "100%" }} />
      <Typography variant={"h4"} color={"text.secondary"}>
        Issued prescriptions
      </Typography>
      <PrescriptionsList />
    </PageBox>
  );
};

export default DoctorPrescriptions;
