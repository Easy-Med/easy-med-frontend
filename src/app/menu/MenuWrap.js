import { useTheme } from "@emotion/react";
import { Box, ListItem } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchBar from "./SearchBar";
import ThemeSwitcher from "../navbar/desktop/ThemeSwitcher";
import {useNavigate} from "react-router-dom";
import {capitalize} from "../utils/stringUtils";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // Uncomment to move upper drawer when side menu is opened
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const LogoBox = styled('div', {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  flexDirection: 'column',
  alignItems: "center",
  width: drawerWidth,
  transition: theme.transitions.create(["width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: '150px',
  }),
}));

const mainSideMenuOptions = [
  {
    name: 'Dashboard',
    link: '',
    icon: <DashboardIcon />
  },
  {
    name: 'Reserved visits',
    link: 'reserved-visits',
    icon: <EventSeatIcon />
  },
  {
    name: 'Booking calendar',
    link: 'booking-calendar',
    icon: <CalendarMonthIcon />
  },
  {
    name: 'Prescriptions',
    link: 'prescriptions',
    icon: <MedicationIcon />
  },
  {
    name: 'Reviews',
    link: 'reviews',
    icon: <RateReviewIcon />
  }
]

const secondarySideMenuOptions = [
  {
    name: 'Settings',
    link: 'settings',
    icon: <SettingsIcon />
  }
]

const MenuWrap = (Component, role) =>
  function HOC() {
    const theme = useTheme();
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(true);

    const handleDrawer = () => {
      setOpen(prevState => !prevState);
    };

    const handleMenuItemClick = (menuItem) => {
      navigate(`/${role.toLowerCase()}/${menuItem.link}`)
    }

    return (
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open} color={'default'}>
          <Toolbar disableGutters={true}>
            <LogoBox open={open}>
              <Typography variant="h5" fontWeight={'bold'} color={'primary'} noWrap component="div">
                EasyMed
              </Typography>
              <Typography variant={'body1'} color={'primary'}>
                {role ? capitalize(role) : ''}
              </Typography>
            </LogoBox>
            <SearchBar />
            <ThemeSwitcher />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          <Divider />
          <List>
            {mainSideMenuOptions.map((menuItem, index) => (
              <ListItemButton
                key={menuItem.name}
                onClick={() => handleMenuItemClick(menuItem)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            {secondarySideMenuOptions.map((menuItem, index) => (
              <ListItemButton
                key={menuItem.name}
                onClick={() => handleMenuItemClick(menuItem)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ height: "100%" }} />
          <Divider />
          <List>
            <ListItem sx={{ justifyContent: open ? "flex-end" : "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
              >
                {open ? (
                  <>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </>
                ) : (
                  <MenuIcon />
                )}
              </IconButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          <Component />
        </Box>
      </Box>
    );
  };

export default MenuWrap;