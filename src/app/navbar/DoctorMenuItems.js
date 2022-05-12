import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicationIcon from "@mui/icons-material/Medication";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuItems from "./MenuItems";

const mainSideMenuOptions = [
  {
    name: "Dashboard",
    link: "",
    icon: <DashboardIcon />,
  },
  {
    name: "Reserved visits",
    link: "reserved-visits",
    icon: <EventSeatIcon />,
  },
  {
    name: "Booking calendar",
    link: "booking-calendar",
    icon: <CalendarMonthIcon />,
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

const DoctorMenuItems = ({ open, ...props }) => {
  return (
    <MenuItems
      open={open}
      role={"doctor"}
      itemsArray={[mainSideMenuOptions, secondarySideMenuOptions]}
    />
  );
};

export default DoctorMenuItems;
