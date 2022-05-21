import React from "react";
import Box from "@mui/material/Box";
import { Skeleton, Typography } from "@mui/material";
import IssuePrescriptionForm from "./IssuePrescriptionForm";
import PrescriptionCard from "../../generic/prescriptions/PrescriptionCard";
import PageBox from "../../generic/PageBox";
import { useQuery } from "react-query";
import PrescriptionsService from "../../../app/api/PrescriptionsService";
import useAuth from "../../../app/auth/UseAuth";

const DoctorPrescriptions = () => {
  const auth = useAuth();
  const { id, role } = auth.authData;
  const prescriptionsQuery = useQuery("doctorPrescriptions", () =>
    PrescriptionsService.getPrescriptionsFor(role, id)
  );

  return (
    <PageBox sx={{ gap: 2 }}>
      <Typography variant={"h4"} color={"text.secondary"}>
        Issue a prescription
      </Typography>
      <IssuePrescriptionForm sx={{ width: "100%" }} />
      <Typography variant={"h4"} color={"text.secondary"}>
        Issued prescriptions
      </Typography>
      {prescriptionsQuery.isLoading && (
        <Skeleton width={300} height={270} variant={"rectangular"} />
      )}
      {prescriptionsQuery.isError && (
        <Typography variant={"h6"}>
          Can't load prescriptions :/. Try again later!
        </Typography>
      )}
      {prescriptionsQuery.isSuccess &&
        prescriptionsQuery.data?.length === 0 && (
          <Typography>No issued prescriptions :o. Go and issue one!</Typography>
        )}
      {prescriptionsQuery.isSuccess && prescriptionsQuery.data?.length !== 0 && (
        <Box display={"flex"} gap={2} flexWrap={"wrap"}>
          {prescriptionsQuery.data.map((prescription) => (
            <PrescriptionCard
              personOnPx={prescription.patientName}
              dateOfIssue={prescription.dateOfIssue}
              listOfMedicines={prescription.medicines.map(
                (medicine) => medicine.name + " " + medicine.capacity
              )}
            />
          ))}
        </Box>
      )}
    </PageBox>
  );
};

export default DoctorPrescriptions;
