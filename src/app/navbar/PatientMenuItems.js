import React from "react";
import MenuItems from "./MenuItems";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MedicationIcon from "@mui/icons-material/Medication";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { Box, Button, IconButton } from "@mui/material";

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

<<<<<<< HEAD
const PatientMenuItems = ({ open, ...props }) => {
  const handleReserveVisit = () => {};
=======
const PatientMenuItems = ({ open, setOpenDialog, ...props }) => {
>>>>>>> 134ad9e (Moved reservation popup to Navbar, slight code refactoring, linked reseravtion button to dialog)

  return (
    <Box>
      <Box
        sx={{ width: "100%", mt: 1, display: "flex", justifyContent: "center" }}
      >
        {open ? (
<<<<<<< HEAD
          <Button onClick={handleReserveVisit} variant={"contained"}>
            Reserve visit
          </Button>
=======
          <Button variant={"contained"} onClick={() => setOpenDialog(true)}>Reserve visit</Button>
>>>>>>> 134ad9e (Moved reservation popup to Navbar, slight code refactoring, linked reseravtion button to dialog)
        ) : (
          <IconButton
            onClick={handleReserveVisit}
            size={"medium"}
            color={"primary"}
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
    </Box>
  );
};

export default PatientMenuItems;
