import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    image: '/bg1.png',
    heading: 'Analyze Videos',
    text: 'Decode practice videos with precision, gaining deeper insights into player tactics and game dynamics.',
  },
  {
    image: '/bg2.png',
    heading: 'Shots Classification',
    text: 'Classify shots accurately, revealing player strategies and enhancing performance analysis.',
  },
  {
    image: '/bg3.png',
    heading: 'Area Calculation',
    text: 'Visualize shot distribution, analyzing fielding positions and percentages with precision',
  },
  {
    image: '/bg4.png',
    heading: 'Adaptive Learning',
    text: 'Identify flaws in your techniques and get improvement plans tailored for each shot.',
  },
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(40px)',
    config: { duration: 500 },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Box>
        <Typography variant="h4" component="h4" sx={{ mb: 4, pl: 2, textAlign: 'left', fontWeight: 'bold' }}>
          Our Expertise and Experience
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {experiences.map((exp, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <animated.div ref={ref} style={cardAnimation}>
                <Box
                  sx={{
                    backgroundImage: `url(${exp.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 400,
                    width: 270,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    color: '#fff',
                    p: 2,
                    ml: 1,
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ textAlign: 'left', maxWidth: '70%', mb: 1, fontWeight: 'bold', fontSize: 24 }}
                  >
                    {exp.heading}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: 16, textAlign: 'left', height: '40%' }}
                  >
                    {exp.text}
                  </Typography>
                </Box>
              </animated.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
