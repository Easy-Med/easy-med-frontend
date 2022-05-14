import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ThemeSwitcher from "../../../app/navbar/ThemeSwitcher";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SettingsService from "../../../app/api/SettingsService";
import useAuth from "../../../app/auth/UseAuth";
import { replaceNull } from "../../../app/utils/objectUtils";
import SettingsSnackbar from "../../generic/settings/SettingsSnackbar";

const initFormData = (children) => {
  const result = {};
  children.forEach((child) => {
    result[child.props.name] = "";
  });

  return result;
};

const Settings = ({ children }) => {
  const [formData, setFormData] = useState(initFormData(children));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const auth = useAuth();
  const role = auth.authData.role;
  const queryClient = useQueryClient();

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const query = useQuery(
    `${role}Settings`,
    () => SettingsService.getAccountDataFor(role),
    {
      onSuccess: (data) => {
        setFormData({ ...formData, ...replaceNull(data, "") });
      },
    }
  );
  const mutation = useMutation(
    () => SettingsService.updateAccountDataFor(role, formData),
    {
      onSuccess: () => {
        showSnackbar("success", "Account data updated successfully");

        queryClient.invalidateQueries("doctorSettings");
      },
      onError: () => {
        showSnackbar("error", "Can't update account data");
      },
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

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
        {children.map((child) =>
          React.cloneElement(child, {
            onChange: handleChange,
            value: formData[child.props.name],
            key: child.props.name,
          })
        )}
        <Button
          disabled={query.isLoading}
          variant={"contained"}
          sx={{ mb: 5 }}
          type={"submit"}
        >
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
      <SettingsSnackbar
        open={openSnackbar}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default Settings;
