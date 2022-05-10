import React from "react";
import PrescriptionCard from "../../generic/prescriptions/PrescriptionCard";
import Box from "@mui/material/Box";
import { Skeleton, Typography } from "@mui/material";
import { useQuery } from "react-query";
import useAuth from "../../../app/auth/UseAuth";
import PrescriptionsService from "../../../app/api/PrescriptionsService";

const PatientPrescriptions = () => {
  const auth = useAuth();
  const { role, id } = auth.authData;

  const prescriptionsQuery = useQuery(`${role}Prescriptions`, () =>
    PrescriptionsService.getPrescriptionsFor(role, id)
  );

  if (prescriptionsQuery.isLoading) {
    return (
      <Skeleton sx={{ m: 2 }} variant="rectangular" width={250} height={416} />
    );
  }

  if (prescriptionsQuery.error) {
    return (
      <Typography mt={3} textAlign={"center"} variant={"h4"}>
        Can't load prescriptions 💊. Try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ m: 2, flex: 1 }}>
      <Box display={"flex"} gap={2} flexWrap={"wrap"} sx={{ mb: 2 }}>
        {prescriptionsQuery.data.length === 0 ? (
          <Typography sx={{ color: "text.secondary" }} variant={"h4"}>
            No prescriptions available
          </Typography>
        ) : (
          prescriptionsQuery.data.map((prescription) => (
            <PrescriptionCard
              isForPatient
              dateOfIssue={prescription.dateOfIssue}
              personOnPx={prescription.personOnPx}
              listOfMedicines={prescription.listOfMedicines}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default PatientPrescriptions;
