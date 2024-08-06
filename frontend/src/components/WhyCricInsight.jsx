import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

export default function WhyCricInsight() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        backgroundColor: '#000', 
        color: '#fff',
        padding: '5px 0',
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={12} md={7} sx={{padding: '0 7% '}}>
          <Box sx={{ textAlign: 'left', pr: { md: 4 } }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
              Why CricInsight?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              CricInsight offers cutting-edge video analysis tools, empowering users to delve deep into cricket match insights. 
              With advanced shot detection and classification, CricInsight provides a comprehensive understanding of player performance and playing areas. 
              Its adaptive learning feature offers personalized feedback, making it a must-have for cricket enthusiasts seeking to improve their game.
            </Typography>
            <Box>
              <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                Try now
              </Button>
              <Button variant="outlined" color="primary">
                Contact us
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} >
          <Box
            component="img"
            src="/why-cricinsight.png" 
            alt="Why CricInsight"
            sx={{
                // height: '50%',
              width: '100%',
              height: 'auto',
            //   borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
