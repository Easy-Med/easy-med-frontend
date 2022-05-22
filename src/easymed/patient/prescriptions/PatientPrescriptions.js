import React from "react";
import PageBox from "../../generic/PageBox";
import PrescriptionsList from "../../generic/prescriptions/PrescriptionsList";

const PatientPrescriptions = () => {
  return (
    <PageBox>
      <PrescriptionsList />
    </PageBox>
  );
};

export default PatientPrescriptions;
