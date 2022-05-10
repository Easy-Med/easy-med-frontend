import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import IssuePrescriptionForm from "./IssuePrescriptionForm";
import PrescriptionCard from "../../generic/prescriptions/PrescriptionCard";

const prescriptions = [
  {
    patientName: "Alex Mandel",
    dateOfIssue: "02.04.2022",
    medicines: [
      {
        name: "Dymista",
        capacity: "20mg",
      },
      {
        name: "Altacet",
        capacity: "100ml",
      },
    ],
  },
  {
    patientName: "Alex Mandel",
    dateOfIssue: "02.04.2022",
    medicines: [
      {
        name: "Dymista",
        capacity: "20mg",
      },
      {
        name: "Altacet",
        capacity: "100ml",
      },
    ],
  },
  {
    patientName: "Alex Mandel",
    dateOfIssue: "02.04.2022",
    medicines: [
      {
        name: "Dymista",
        capacity: "20mg",
      },
      {
        name: "Altacet",
        capacity: "100ml",
      },
    ],
  },
];

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
      <Box display={"flex"} gap={2} flexWrap={"wrap"}>
        {prescriptions.map((prescription) => (
          <PrescriptionCard
            personOnPx={prescription.patientName}
            dateOfIssue={prescription.dateOfIssue}
            listOfMedicines={prescription.medicines.map(
              (medicine) => medicine.name + " " + medicine.capacity
            )}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DoctorPrescriptions;
