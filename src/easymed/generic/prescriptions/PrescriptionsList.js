import React from "react";
import { Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PrescriptionCard from "./PrescriptionCard";
import useAuth from "../../../app/auth/UseAuth";
import { useQuery } from "react-query";
import PrescriptionsService from "../../../app/api/PrescriptionsService";

const PrescriptionsList = () => {
  const auth = useAuth();
  const { id, role } = auth.authData;
  const prescriptionsQuery = useQuery(`${role}Prescriptions`, () =>
    PrescriptionsService.getPrescriptionsFor(role, id)
  );

  return (
    <>
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
              key={prescription.id}
              isForPatient
              personOnPx={
                role === "doctor"
                  ? prescription.patientName
                  : prescription.doctorName
              }
              dateOfIssue={prescription.dateOfIssue}
              listOfMedicines={prescription.medicines.map(
                (medicine) => medicine.name + " " + medicine.capacity
              )}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default PrescriptionsList;