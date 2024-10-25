import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: theme.spacing(6, 0),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#ffffff',
  textDecoration: 'none',
  '&:hover': {
    // color: 'theme.palette.primary.main',
    textDecoration: 'none',
    cursor: 'pointer'
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const Footer = () => {
  const theme = useTheme();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const quickLinks = [
    { text: 'Login', href: '/login' },
    { text: 'Dashboard', href: '/dashboard' },
    { text: 'Experience', href: '/experience' },
    { text: 'Our Services', href: '/services' },
    { text: 'Reviews', href: '/reviews' },
    { text: 'Contact Us', href: '/contact' },
  ];

  return (
    <StyledFooter 
      component={motion.footer} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={footerVariants}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div variants={footerVariants}>
              <Box>
                <img 
                  src="./assets/home-logo.png"
                  alt="CricInsight Logo"
                  style={{ width: 250 }}
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <motion.div variants={footerVariants}>
              <Typography 
                variant="h6" 
                sx={{ mb: 2, pt: 2, fontWeight: 'bold' }}
              >
                Quick Links
              </Typography>
              <Box 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                {quickLinks.map((link) => (
                  <FooterLink 
                    key={link.text}
                    href={link.href}
                    variant="body2"
                  >
                    {link.text}
                  </FooterLink>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <motion.div variants={footerVariants}>
              <Typography 
                variant="h6" 
                sx={{ mb: 2, pt:2, fontWeight: 'bold' }}
              >
                Contact
              </Typography>
              
              <ContactItem sx={{pb:1}}>
                <Phone size={20} />
                <Typography variant="body2">
                + 1800 145 276
                </Typography>
              </ContactItem>
              
              <ContactItem sx={{pb:1}}>
                <Mail size={20} />
                <Typography variant="body2">
                  cricinsight@gmail.com
                </Typography>
              </ContactItem>

              {/* Social Media */}
              <Box sx={{ mt: 3 }}>
                <SocialButton aria-label="Facebook">
                  <Facebook size={24} />
                </SocialButton>
                <SocialButton aria-label="Twitter">
                  <Twitter size={24} />
                </SocialButton>
                <SocialButton aria-label="Instagram">
                  <Instagram size={24} />
                </SocialButton>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Typography 
          variant="body2" 
          align="center"
          sx={{ 
            mt: 4, 
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          component={motion.div}
          variants={footerVariants}
        >
          Copyright © {new Date().getFullYear()} CricInsight
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
