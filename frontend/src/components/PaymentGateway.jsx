import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { WidthFull } from '@mui/icons-material';

const plans = [
  {
    title: 'Basic',
    price: '$14',
    period: 'Weekly',
    features: [
      'Unlimited analysis',
      'Unlimited Suggestions',
      'Cancel Anytime',
      'Secure Payment Processing',
      '24/7 Support'
    ],
    buttonText: 'Choose Plan',
    highlighted: false
  },
  {
    title: 'Popular',
    price: '$29',
    period: 'Monthly',
    features: [
      'Unlimited analysis',
      'Unlimited Suggestions',
      'Cancel Anytime',
      'Secure Payment Processing',
      '24/7 Support'
    ],
    buttonText: 'Choose Plan',
    highlighted: true
  },
  {
    title: 'Advance',
    price: '$139',
    period: 'Yearly',
    features: [
      'Unlimited analysis',
      'Unlimited Suggestions',
      'Cancel Anytime',
      'Secure Payment Processing',
      '24/7 Support'
    ],
    buttonText: 'Choose Plan',
    highlighted: false
  }
];
// const CenteredHr = styled('hr')({
//   width: '30%',
//   margin: '0 auto', 
// });

const PaymentGateway = () => {
  return (
    <Box sx={{ padding: 4, minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', paddingRight: "80px",paddingLeft: "80px",marginBottom: 3 }}>
        Identify technique flaws and get tailored improvement plans.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <CheckIcon sx={{ color: '#030947', marginRight: 1 }} />
          <Typography>Free 15-day trial</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <CheckIcon sx={{ color: '#030947', marginRight: 1 }} />
          <Typography>Unlimited technique analysis</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckIcon sx={{ color: '#030947', marginRight: 1 }} />
          <Typography>Cancel Anytime</Typography>
        </Box>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                padding: 3,
                textAlign: 'center',
                backgroundColor: plan.highlighted ? '#030947' : '#FFFFFF',
                color: plan.highlighted ? '#FFFFFF' : '#000000',
                // borderRadius: 2,
                // boxShadow: plan ? '2px red' : 'none',
                // border: '1px solid #747474',
              }}
              elevation="4"
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {plan.title}
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {plan.price}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {plan.period}
              </Typography>
              <Button variant="contained" sx={{ marginBottom: 2, backgroundColor: plan.highlighted ? '#FFFFFF' : '#030947', color: plan.highlighted ? '#030947' : '#FFFFFF' }}>
                {plan.buttonText}
                
              </Button>

              {/* <CenteredHr /> */}
              <hr />
              {plan.features.map((feature, i) => (
                <Typography variant="body2" sx={{ marginBottom: 1 }} key={i}>
  
                  {feature}
                </Typography>
              ))}
              
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PaymentGateway;
