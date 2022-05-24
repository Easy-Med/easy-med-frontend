import React from "react";
import PageBox from "../../generic/PageBox";
import DailyInfo from "./DailyInfo";
import GeneralInfo from "./GeneralInfo";

const DoctorDashboard = () => {
  return (
    <PageBox>
      <DailyInfo />
      <GeneralInfo />
    </PageBox>
  );
};

export default DoctorDashboard;
