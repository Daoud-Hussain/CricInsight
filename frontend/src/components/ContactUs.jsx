import React from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent} from '@mui/material';
import { Phone, Mail } from 'lucide-react';

const ContactForm = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 , textAlign: 'center'}}>
      <Typography variant="body" color="#030D40" sx={{fontWeight: 'bold'}} >
        Contact Us
      </Typography>
      <Typography variant="h3" fontWeight="bold" sx={{textAlign: 'center'}} gutterBottom>
        Get in touch with us
      </Typography>
      
      <Card sx={{ bgcolor: '#F3F3F3', borderRadius: 2, boxShadow: 'none', textAlign: 'left' }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Drop us a message
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                We will get back to you as soon as possible.
              </Typography>
              
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      sx={{bgcolor: '#fff'}}
                      placeholder="Full Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      placeholder="Company Name"
                      sx={{bgcolor: '#fff'}}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Work Email"
                      variant="outlined"
                      sx={{bgcolor: '#fff'}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      sx={{bgcolor: '#fff'}}
                      placeholder="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                    borderRadius: 2,
                    bgcolor: '#030D40', 
                    '&:hover': { bgcolor: '#030D40' } 
                  }}
                >
                  Send
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Phone color="#fff" size={35} style={{ marginRight: '12px', background: '#030D40', padding: 8, borderRadius: 50 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      + 1800 145 276
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Call us
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Mail color="#fff" size={35} style={{ marginRight: '12px', background: '#030D40', padding: 8, borderRadius: 50 }}  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      cricinsight@gmail.com
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email us
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactForm;