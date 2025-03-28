import React, { useRef } from "react";
import { Grid, Card, Typography, Box } from "@mui/material";
import { motion, useInView } from "framer-motion";

const services = [
  {
    title: "Game Analysis",
    description: "Decode practice videos with precision, gaining deeper insights into player tactics and game dynamics.",
    imgSrc: './Mask group.png'
  },
  {
    title: "Techniques Improvement",
    description: "Identify flaws in your shot techniques and get improvement plans tailored for each shot.",
    imgSrc: './Personal Growth.png'
  },
  {
    title: "Data Visualization",
    description: "Get a user-friendly visual representation of all the shots you play with their percentages.",
    imgSrc: './Graph.png'
  },
  {
    title: "Field Calculation",
    description: "Visualize shot distribution, analyzing fielding positions and percentages with precision.",
    imgSrc: './Hockey Ball.png'
  },
];

const MotionCard = motion(Card);
const MotionTypography = motion(Typography);
const MotionImg = motion.img;

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Box ref={ref} sx={{ textAlign: "center", mx: 2, px: 2, py: { xs: 6, sm: 6, md: 0 } }}>
      <MotionTypography
        variant="body"
        color="#030D40"
        sx={{ fontWeight: 'bold' }}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </MotionTypography>
      <MotionTypography
        variant="h4"
        fontWeight="600"
        gutterBottom
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        }}
      >
        What We Offer?
      </MotionTypography>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={3} container direction="column" spacing={3}>
          {services.slice(0, 2).map((service, index) => (
            <Grid item key={index}>
              <MotionCard
                sx={{ p: 3, height: '100%', boxShadow: 'none', display: 'flex', flexDirection: 'column', background: '#F3F3F3', justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left' }}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <MotionImg
                  src={service.imgSrc}
                  style={{ filter: "brightness(0) saturate(100%) invert(7%) sepia(82%) saturate(3872%) hue-rotate(236deg) brightness(93%) contrast(107%)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom marginTop={1} fontFamily='system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                >
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MotionCard
            sx={{ p: 2, height: { sm: "110%", md: "80%" }, my: { sm: 8, md: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#030D40' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <MotionImg
              src='./logo.png'
              alt="CricInsight Logo"
              style={{ width: "90%", height: "auto", margin: 8 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </MotionCard>
        </Grid>

        <Grid item xs={12} md={3} container direction="column" spacing={3}>
          {services.slice(2, 4).map((service, index) => (
            <Grid item key={index}>
              <MotionCard
                sx={{ p: 3, height: '100%', display: 'flex', boxShadow: 'none', flexDirection: 'column', background: '#F3F3F3', justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left' }}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <MotionImg
                  src={service.imgSrc}
                  sx={{ mb: 1 }}
                  style={{ filter: "brightness(0) saturate(100%) invert(7%) sepia(82%) saturate(3872%) hue-rotate(236deg) brightness(93%) contrast(107%)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom fontFamily='system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                >
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;