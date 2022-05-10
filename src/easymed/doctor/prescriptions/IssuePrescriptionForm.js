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

const initFormData = {
  patient: null,
  medicines: [],
};

const initMedicine = {
  name: "",
  capacity: "",
};

const options = [];

const IssuePrescriptionForm = ({ sx = [] }) => {
  const [formData, setFormData] = useState(initFormData);
  const [medicine, setMedicine] = useState(initMedicine);
  const [patientInputValue, setPatientInputValue] = useState("");
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

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
    console.log("Send data", formData);
  };

  const resetFormData = () => {
    setFormData(initFormData);
    setMedicine(initMedicine);
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
                      {loadingPatients ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            options={options}
            open={open}
            onOpen={() => {
              setLoadingPatients(true);
              setOpen(true);
            }}
            onClose={() => {
              setLoadingPatients(false);
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            loading={loadingPatients}
            value={formData.patient}
            onChange={(e, newValue) =>
              setFormData({ ...formData, patient: newValue })
            }
            inputValue={patientInputValue}
            onInputChange={(event, newInputValue) =>
              setPatientInputValue(newInputValue)
            }
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
        <Button type={"submit"} variant={"contained"}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default IssuePrescriptionForm;