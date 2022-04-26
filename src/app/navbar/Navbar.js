import { useTheme } from "@emotion/react";
import { Avatar, Box, Button, ListItem, useMediaQuery } from "@mui/material";
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
import SearchBar from "./SearchBar";
import { Outlet, useNavigate } from "react-router-dom";
import { capitalize } from "../utils/stringUtils";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoctorMenuItems from "./DoctorMenuItems";
import PatientMenuItems from "./PatientMenuItems";
import useAuth from "../auth/UseAuth";
import PatientReserveVisitPopup from "../../easymed/patient/PatientReserveVisitPopup";

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
    // Uncomment to move upper drawer when side navbar is opened
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

const LogoBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  width: drawerWidth,
  transition: theme.transitions.create(["width", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  "&:hover": {
    opacity: 0.8,
  },
  ...(open && {
    transition: theme.transitions.create(["width", "opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: "150px",
  }),
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "auto",
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = useAuth();
  const role = auth.authData.role;
  const name = `${auth.authData.firstName} ${auth.authData.lastName}`;
  const matchesDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex", height: { xs: "auto", md: "100vh" } }}>
      <AppBar position="fixed" open={open} color={"default"}>
        <Toolbar disableGutters={true}>
          <LogoBox open={open} onClick={() => navigate(`/${role}`)}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              color={"primary"}
              noWrap
              component="div"
            >
              EasyMed
            </Typography>
            <Typography variant={"body1"} color={"primary"}>
              {role ? capitalize(role) : ""}
            </Typography>
          </LogoBox>
          <SearchBar />
          <Box sx={{ flex: 1 }} />
          <IconButton sx={{ display: { xs: "none", sm: "inherit" } }}>
            <NotificationsIcon />
          </IconButton>
          <Avatar
            sx={{
              mx: { xs: 1, sm: 2 },
              display: { xs: "none", sm: "inherit" },
            }}
          >
            A
          </Avatar>
          <Typography
            sx={{
              mx: 1,
              flexShrink: 0,
              display: { xs: "none", sm: "inherit" },
            }}
          >
            {name}
          </Typography>
          <Button
            variant={"outlined"}
            size={matchesDesktop ? "medium" : "small"}
            sx={{ mx: 2, flexShrink: "0" }}
            onClick={auth.signOut}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        {
          {
            doctor: <DoctorMenuItems open={open} />,
            patient: <PatientMenuItems open={open} setOpenDialog={setOpenDialog}/>,
          }[role.toLowerCase()]
        }
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
      <Box
        component="main"
        sx={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <DrawerHeader />
        <PatientReserveVisitPopup openDialog={openDialog} setOpenDialog={setOpenDialog}/>
        <Outlet  />
      </Box>
    </Box>
  );
};

export default Navbar;
