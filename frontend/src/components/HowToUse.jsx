import * as React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";

function HowToUseSection() {
  return (
    <Box sx={{ padding: 10, backgroundColor: "#F4F4F4" }}>
      <Grid container spacing={4}>
        {/* Step 1 */}
        <Grid md=>
            
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 2,
              }}
            >
              How to Use?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins, sans-serif",
                marginBottom: 4,
                color: "#4a4a4a",
              }}
            >
              Discover CricInsight for in-depth cricket analysis. Whether you're
              a player, coach, or team manager, it provides insights to enhance
              your cricket experience.
            </Typography>
      
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              py: 7,
              px: 5,
              borderRadius: 2,
              // backgroundColor: "#ffffff",
              backgroundColor: "#030947",
              color: "#ffffff",
              height: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
                color: '#fff'
              }}
            >
              01
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
              }}
            >
              Signup / Login
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#fff",
              }}
            >
              Create an account first on the CricInsight platform or log in if
              you already have an account.
            </Typography>
          </Paper>
        </Grid>
        {/* Step 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              py: 7,
              px: 5,
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
                color: "#030947",

              }}
            >
              02
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
              }}
            >
              Upload Videos
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#4a4a4a"
              }}
            >
              Upload your cricket match videos for analysis. You can trim videos
              and merge multiple videos as well.
            </Typography>
          </Paper>
        </Grid>
        {/* Step 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              py: 7,
              px: 5,
              borderRadius: 2,
              backgroundColor: "#030947",
              color: "#ffffff",
              height: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
                color: '#fff'
              }}
            >
              03
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
              }}
            >
              Data Analytics
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#fff",
              }}
            >
              Analyze your game and get highlights of your gameplay and get a
              overview of all the shots you play.
            </Typography>
          </Paper>
        </Grid>
        {/* Step 4 */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              py: 7,
              px: 5,
              borderRadius: 2,
              backgroundColor: "#ffffff",
              height: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
                color: '#030947'
              }}
            >
              04
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
              }}
            >
              Area Calculation
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#4a4a4a",
              }}
            >
              Calculates the percentage distribution of shots across different
              fielding areas for insightful analysis.
            </Typography>
          </Paper>
        </Grid>
        {/* Step 5 */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              py: 7,
              px: 5,
              borderRadius: 2,
              backgroundColor: "#030947",
              color: "#ffffff",
              height: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
                color: '#fff'
              }}
            >
              05
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
              }}
            >
              Adaptive Learning
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#fff",
              }}
            >
              Get tailored solutions to enhance cricket skills based on
              identified technical flaws from your gameplay.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              py: 7,
              px: 5,
              borderRadius: 2,
              backgroundColor: "#fff",
              height: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
                color: "#030947",
              }}
            >
              06
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                marginBottom: 1,
              }}
            >
              AI Assistant
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#4a4a4a",
              }}
            >
              Get tailored solutions to enhance cricket skills based on
              identified technical flaws from your gameplay.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HowToUseSection;
