import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './AppAppBar';
import getLPTheme from './getLPTheme';
import HomeSection from './HomeSection';
import Experience from './Experience';
import HowToUseSection from './HowToUse';
import WhyCricInsight from './WhyCricInsight';
import WhatWeOffer from './ServicesOffered';
import TestimonialSlider from './Testimonials';
import ContactForm from './ContactUs';
import Footer from './Footer';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const [showCustomTheme, setShowCustomTheme] = React.useState(false);
  const LPtheme = createTheme(getLPTheme('light'));
  const defaultTheme = createTheme({ palette: { mode: 'light' } });


  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar />
      <Box id="home">
        <HomeSection imageSrc="/home-image.png" />
      </Box>
      <Box id="experience">
        <Experience />
      </Box>
      <Box id="howToUse">
        <HowToUseSection />
      </Box>
      <WhyCricInsight />
      <Box id="services">
        <WhatWeOffer />
      </Box>
      <Box id="contact">
        <ContactForm />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
