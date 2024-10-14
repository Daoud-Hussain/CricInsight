import React from "react";
import { Grid, Card, Typography, Box } from "@mui/material";

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

const Services = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 5, px: 2 }}>
      <Typography variant="body" color="#030D40" sx={{fontWeight: 'bold'}}>
        Our Services
      </Typography>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        What We Offer?
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={3} container direction="column" spacing={3}>
          {services.slice(0, 2).map((service, index) => (
            <Grid item key={index}>
              <Card sx={{ p: 3, height: '100%', boxShadow: 'none',display: 'flex', flexDirection: 'column', background: '#F3F3F3', justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left' }}>
                <img
                src={service.imgSrc}
                style={{filter: "brightness(0) saturate(100%) invert(7%) sepia(82%) saturate(3872%) hue-rotate(236deg) brightness(93%) contrast(107%)"}}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom marginTop={1}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} md={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Card sx={{ p: 2, height: '80%',display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2,backgroundColor: '#030D40' }}>
          <img
              src='./logo.png'
              alt="CricInsight Logo"
              style={{ width: "90%", height: "auto", margin: 8 }}
              
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={3} container direction="column" spacing={3}>
          {services.slice(2, 4).map((service, index) => (
            <Grid item key={index}>
              <Card sx={{ p: 3, height: '100%', display: 'flex',  boxShadow: 'none', flexDirection: 'column', background: '#F3F3F3',justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left' }}>
              <img
                src={service.imgSrc}
                sx={{mb:1}}
                style={{filter: "brightness(0) saturate(100%) invert(7%) sepia(82%) saturate(3872%) hue-rotate(236deg) brightness(93%) contrast(107%)"}}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;