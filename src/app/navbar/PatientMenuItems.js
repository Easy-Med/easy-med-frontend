import React from "react";
import { useState } from "react";
import MenuItems from "./MenuItems";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MedicationIcon from "@mui/icons-material/Medication";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { Box, Button, IconButton, Snackbar, Slide, Alert } from "@mui/material";
import PatientReserveVisitPopup from "../../easymed/patient/reserveNewVisit/PatientReserveVisitPopup.js"

const mainSideMenuOptions = [
  {
    name: "Reserved visits",
    link: "reserved-visits",
    icon: <EventSeatIcon />,
  },
  {
    name: "Prescriptions",
    link: "prescriptions",
    icon: <MedicationIcon />,
  },
  {
    name: "Reviews",
    link: "reviews",
    icon: <RateReviewIcon />,
  },
];

const secondarySideMenuOptions = [
  {
    name: "Settings",
    link: "settings",
    icon: <SettingsIcon />,
  },
];

const SnackbarAlert = React.forwardRef(function SnackbarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});

const PatientMenuItems = ({ open, ...props }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  function alertTransition(rest) {
    return <Slide {...rest} direction="left" />;
  }

  const handleCloseSuccessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessAlert(false);
  };

  return (
    <Box>
      <Box
        sx={{ width: "100%", mt: 1, display: "flex", justifyContent: "center" }}
      >
        {open ? (
          <Button variant={"contained"} onClick={() => setOpenDialog(true)}>
            Reserve visit
          </Button>
        ) : (
          <IconButton
            size={"medium"}
            color={"primary"}
            onClick={() => setOpenDialog(true)}
          >
            <BookOnlineIcon />
          </IconButton>
        )}
      </Box>
      <MenuItems
        open={open}
        role={"patient"}
        itemsArray={[mainSideMenuOptions, secondarySideMenuOptions]}
      />

      <PatientReserveVisitPopup
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setShowSuccessAlert={setShowSuccessAlert}
      />
      <Snackbar
        open={showSuccessAlert}
        onClose={handleCloseSuccessAlert}
        TransitionComponent={alertTransition}
        autoHideDuration={3000}
        message=""
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 10 }}
      >
        <SnackbarAlert
          onClose={handleCloseSuccessAlert}
          severity="success"
          color={"primary"}
          variant="filled"
        >
          Visit reserved succesfully!
        </SnackbarAlert>
      </Snackbar>
    </Box>
  );
};

export default PatientMenuItems;
