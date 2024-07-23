import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShareIcon from "@mui/icons-material/Share";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { mainListItems, secondaryListItems } from "./listItems";
import Visualization from "./Visualization";
import VideoInsight from "./VideoInsight";
import PaymentGateway from "./PaymentGateway";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#030947",
    },
    secondary: {
      main: "#D52728",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F1F1F",
    },
    primary: {
      main: "#33C0FF",
    },
    secondary: {
      main: "#5733FF",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("VideoInsight");

  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleMenuClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.palette.background.default,
          marginTop: 7,
        }}
      >
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
              backgroundColor: theme.palette.background.default,
              boxShadow: "none",
              color: theme.palette.text.primary,
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                color: theme.palette.text.primary,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Overview
            </Typography>
            <IconButton>
              <ShareIcon sx={{ color: theme.palette.text.primary, mx: 1 }} />
            </IconButton>
            <IconButton onClick={toggleTheme}>
              {darkMode ? (
                <LightModeIcon sx={{ color: theme.palette.text.primary }} />
              ) : (
                <DarkModeIcon sx={{ color: theme.palette.text.primary }} />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              backgroundColor: theme.palette.background.default,
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {mainListItems(handleMenuClick, selectedComponent)}
          </List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            backgroundColor: theme.palette.background.default,
            padding: "24px",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {selectedComponent === "VideoInsight" && <VideoInsight />}
                {selectedComponent === "Visualization" && <Visualization />}
                {selectedComponent === "PaymentGateway" && <PaymentGateway />}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
