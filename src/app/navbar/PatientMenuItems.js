import React from "react";
import MenuItems from "./MenuItems";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MedicationIcon from "@mui/icons-material/Medication";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import {Box, Button, IconButton} from "@mui/material";

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

const PatientMenuItems = ({ open, ...props }) => {
  return (
    <Box>
      <Box
        sx={{ width: "100%", mt: 1, display: "flex", justifyContent: "center" }}
      >
        {open ? (
          <Button variant={"contained"}>Reserve visit</Button>
        ) : (
          <IconButton size={"medium"} color={"primary"}>
            <EventSeatIcon />
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
