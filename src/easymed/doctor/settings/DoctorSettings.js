import React from "react";
import { TextField } from "@mui/material";
import DoctorSpecializationsSelect from "./DoctorSpecializationsSelect";
import Settings from "../../generic/settings/Settings";

const DoctorSettings = () => {
  return (
    <Settings>
      <TextField name={"firstName"} label={"First name"} />
      <TextField name={"lastName"} label={"Last name"} />
      <TextField
        name={"email"}
        label={"Email"}
        placeholder={"e.g. kowalski@gmail.com"}
        type={"email"}
      />
      <TextField
        name={"telephone"}
        label={"Telephone"}
        placeholder={"e.g. 506871462"}
        type={"tel"}
      />
      <TextField
        name={"description"}
        label={"Description"}
        placeholder={"Describe yourself in a few sentences..."}
        multiline
        rows={4}
      />
      <TextField
        name={"officeLocation"}
        label={"Office location"}
        placeholder={"e.g. ul. Młynowa 17, 15-404 Białystok"}
      />
      <DoctorSpecializationsSelect
        name={"medicalSpecialization"}
        label={"Medical specialization"}
      />
    </Settings>
  );
};

export default DoctorSettings;
