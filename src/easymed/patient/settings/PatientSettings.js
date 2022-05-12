import React from "react";
import Settings from "../../generic/settings/Settings";
import { TextField } from "@mui/material";

const PatientSettings = () => {
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
        name={"personalIdentityNumber"}
        label={"Pesel"}
        placeholder={"e.g. 00661415687"}
      />
    </Settings>
  );
};

export default PatientSettings;
