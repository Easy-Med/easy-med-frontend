import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ThemeSwitcher from "../../../app/navbar/ThemeSwitcher";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SettingsService from "../../../app/api/SettingsService";
import useAuth from "../../../app/auth/UseAuth";
import { replaceNull } from "../../../app/utils/objectUtils";
import ErrorSnackbar from "./ErrorSnackbar";

const initFormData = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  description: "",
  officeLocation: "",
  medicalSpecialization: "",
};

const DoctorSettings = () => {
  const [formData, setFormData] = useState(initFormData);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const auth = useAuth();
  const doctorId = auth.authData.id;
  const queryClient = useQueryClient();

  const showSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const query = useQuery(
    "doctorSettings",
    () => SettingsService.getAccountDataForDoctorId(doctorId),
    {
      onSuccess: (data) => {
        setFormData({ ...formData, ...replaceNull(data, "") });
      },
    }
  );
  const mutation = useMutation(
    () => SettingsService.updateAccountDataForDoctorId(doctorId, formData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("doctorSettings");
      },
      onError: (error) => {
        showSnackbar()
      },
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate();
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      sx={{ py: 2, px: 5 }}
    >
      <Typography variant={"h6"} fontWeight={"bold"}>
        Account data
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        width={"100%"}
        maxWidth={"600px"}
        sx={{ my: 3 }}
      >
        <TextField
          name={"firstName"}
          label={"First name"}
          onChange={handleChange}
          value={formData.firstName}
        />
        <TextField
          name={"lastName"}
          label={"Last name"}
          onChange={handleChange}
          value={formData.lastName}
        />
        <TextField
          name={"email"}
          label={"Email"}
          type={"email"}
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          name={"telephone"}
          label={"Telephone"}
          type={"tel"}
          onChange={handleChange}
          value={formData.telephone}
        />
        <TextField
          name={"description"}
          label={"Description"}
          onChange={handleChange}
          value={formData.description}
          multiline
          rows={4}
        />
        <TextField
          name={"officeLocation"}
          label={"Office location"}
          onChange={handleChange}
          value={formData.officeLocation}
        />
        <TextField
          name={"medicalSpecialization"}
          label={"Medical specialization"}
          onChange={handleChange}
          value={formData.medicalSpecialization}
        />
        <Button disabled={query.isLoading} variant={"contained"} sx={{ mb: 5 }} type={"submit"}>
          Save changes
        </Button>
      </Box>
      <Divider sx={{ width: "100%" }} />
      <Typography variant={"h6"} fontWeight={"bold"} sx={{ mt: 3 }}>
        Application settings
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Typography>Change theme: </Typography>
        <ThemeSwitcher />
      </Box>
      <ErrorSnackbar open={openSnackbar} handleClose={handleSnackbarClose} message={"Can't update account data"} />
    </Box>
  );
};

export default DoctorSettings;
