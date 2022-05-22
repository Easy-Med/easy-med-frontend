import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@emotion/react";
import { useMutation, useQueryClient } from "react-query";
import PrescriptionsService from "../../../app/api/PrescriptionsService";
import useAuth from "../../../app/auth/UseAuth";

const initFormData = {
  patientId: null,
  medicines: [],
};

const initMedicine = {
  name: "",
  capacity: "",
};

const IssuePrescriptionForm = ({ sx = [] }) => {
  const [formData, setFormData] = useState(initFormData);
  const [chosenPatient, setChosenPatient] = useState(null);
  const [medicine, setMedicine] = useState(initMedicine);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const auth = useAuth();
  const { id } = auth.authData;
  const queryClient = useQueryClient();

  const availablePatientsMutation = useMutation("availablePatients", () =>
    PrescriptionsService.getPatientsWhoCanGetPrescriptionForDoctor(id)
  );

  const issuePrescriptionMutation = useMutation(
    "issuePrescription",
    () => PrescriptionsService.issuePrescriptionFromDoctor(id, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("doctorPrescriptions");
        resetFormData();
      },
    }
  );

  const handleMedicineChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleAddMedicine = (e) => {
    e.preventDefault();
    setFormData({ ...formData, medicines: [...formData.medicines, medicine] });
    setMedicine(initMedicine);
  };

  const handleSubmitPrescription = (e) => {
    e.preventDefault();
    issuePrescriptionMutation.mutate();
  };

  const resetFormData = () => {
    setFormData(initFormData);
    setMedicine(initMedicine);
    setChosenPatient(null);
  };

  const handleOpenPatientAutocomplete = () => {
    setOpen(true);
    if (!availablePatientsMutation.data) {
      availablePatientsMutation.mutate();
    }
  };

  const handleClosePatientAutocomplete = () => {
    setOpen(false);
  };

  return (
    <Paper
      elevation={2}
      sx={[
        {
          display: "flex",
          flexDirection: "column",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      component={"form"}
      onSubmit={handleSubmitPrescription}
    >
      <Box display={"flex"} width={"100%"} p={2}>
        <Box display={"flex"} flexDirection={"column"} gap={1} width={"48%"}>
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                variant={"standard"}
                label={"Patient"}
                required
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {availablePatientsMutation.isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            options={
              availablePatientsMutation.isSuccess
                ? availablePatientsMutation.data
                : []
            }
            open={open}
            onOpen={handleOpenPatientAutocomplete}
            onClose={handleClosePatientAutocomplete}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            getOptionLabel={(option) => {
              return `${option.firstName} ${option.lastName} (${option.personalIdentityNumber})`;
            }}
            loading={availablePatientsMutation.isLoading}
            value={chosenPatient}
            onChange={(e, newValue) => {
              setChosenPatient(newValue);
              setFormData({ ...formData, patientId: newValue?.id });
            }}
          />
          <TextField
            variant={"standard"}
            name={"name"}
            label={"Medicine Name"}
            value={medicine.name}
            onChange={handleMedicineChange}
          />
          <TextField
            variant={"standard"}
            name={"capacity"}
            label={"Medicine Capacity"}
            value={medicine.capacity}
            onChange={handleMedicineChange}
          />
          <Button
            onClick={handleAddMedicine}
            variant={"outlined"}
            sx={{ alignSelf: "flex-start", mt: 2 }}
          >
            Add medicine
          </Button>
        </Box>
        <Divider orientation={"vertical"} sx={{ mx: 2 }} flexItem />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant={"h5"}>Prescribed medicines</Typography>
          <ul>
            {formData.medicines.map((medicine, index) => (
              <li key={index}>
                {medicine.name} {medicine.capacity}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
      <Box
        bgcolor={theme.palette.mode === "light" ? "grey.200" : "grey.800"}
        p={2}
        display={"flex"}
        justifyContent={"flex-end"}
        gap={2}
      >
        <Button onClick={resetFormData} variant={"contained"} color={"error"}>
          Reset
        </Button>
        <Button
          type={"submit"}
          variant={"contained"}
          disabled={issuePrescriptionMutation.isLoading}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default IssuePrescriptionForm;