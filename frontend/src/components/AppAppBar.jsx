import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';


const logoStyle = {
  width: "auto",
  height: "60px",
  cursor: "pointer",
  mx: 10,
};


const navMenus = [
  { label: "About", sectionId: "experience" },
  { label: "How to Use", sectionId: "howToUse" },
  { label: "Services", sectionId: "services" },
  { label: "Contact", sectionId: "contact" }
];

function AppAppBar({ mode, toggleColorMode }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  // Add this function to handle logo click
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setOpen(false);
  };
  const logoStyle = {
    width: "auto",
    height: "60px",
    cursor: "pointer",
    mx: 10,
    transition: "transform 0.2s", // Optional: adds hover effect
    "&:hover": {
      transform: "scale(1.05)" // Optional: adds hover effect
    }
  };


  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const headerOffset = 80;
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              flexDirection: "row",
              borderRadius: "999px",
              bgcolor: "transparent",
              color: "transparent",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >

            <Box
              onClick={() => scrollToSection("home")}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "&:hover img": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <img
                src="/logo.png"
                style={{
                  ...logoStyle,
                  marginRight: "16px", // Add spacing between the logo and nav links
                  transition: "transform 0.2s ease-in-out",
                }}
                alt="Logo"
              />
            </Box>

            {/* Navigation links in the center */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              {navMenus.map((menu) => (
                <MenuItem
                  key={menu.sectionId}
                  onClick={() => scrollToSection(menu.sectionId)}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "600",
                      backgroundColor: "#030947",
                      borderRadius: 5,
                      px: 2,
                      py: 1,
                      color: "white",
                    }}
                  >
                    {menu.label}
                  </Typography>
                </MenuItem>
              ))}
            </Box>

            {/* Right-side Login Button */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <MenuItem onClick={() => navigate("/login")}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "600",
                    background: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 5,
                    color: "#030947",
                  }}
                >
                  Login
                </Typography>
              </MenuItem>
            </Box>
          </Toolbar>

        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
