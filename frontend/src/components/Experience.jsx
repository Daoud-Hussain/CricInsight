import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    image: '/bg2.png',
    heading: 'Shots Visualization',
    text: 'Classify shots accurately, revealing player strategies and enhancing performance analysis.',
  },
  {
    image: '/bg3.png',
    heading: 'Area Calculation',
    text: 'Visualize shot distribution, analyzing fielding positions and percentages with precision.',
  },
  {
    image: '/bg4.png',
    heading: 'Adaptive Learning',
    text: 'Identify flaws in your techniques and get improvement plans tailored for each shot.',
  },
  {
    image: '/image.jpg',
    heading: 'AI Assistant',
    text: 'Leverage our AI Assistant for instant analysis, intelligent responses, and seamless interaction.',
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
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
        py: 6,
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

        }}
      >
        Our Expertise and Experience
      </Typography>
      <Grid container spacing={2} sx={{maxWidth: {sm:"96%" ,md: '90%'}}} justifyContent="center">
        {experiences.map((exp, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <animated.div ref={ref} style={cardAnimation}>
              <Box
                sx={{
                  backgroundImage: `url(${exp.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: 450,
                  minWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  color: '#fff',
                  borderRadius: 2,
                  boxShadow: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    background: 'rgba(0,0,0,0.6)',
                    width: '100%',
                    height: '100%',
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: '600',
                      fontSize: '1.6rem',   
                      mb: 1,
                      maxWidth: { sm: '100%', md: '50%' },
                      textAlign: 'left',
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                    }}
                  >
                    {exp.heading}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      textAlign: 'left',
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    {exp.text}
                  </Typography>
                </Box>
              </Box>
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
