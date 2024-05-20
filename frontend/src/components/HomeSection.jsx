import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

function HomeSection({ imageSrc }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        backgroundColor: "#000000",
        paddingTop: "10%",
        height: "110vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Box
        sx={{
          flex: 1,
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: "60px",
            paddingLeft: 10,
            fontWeight: 100,
            color: "white",
          }}
        >
          Take your game to next level with{" "}
          <Box component="span" sx={{ fontWeight: "bold" }}>
            CricInsight{" "}
          </Box>
          .
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 1,
            paddingLeft: 10,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#030947",
              color: "#fff",
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              borderColor: "#030947",
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: { xs: "center", md: "center" },
          alignItems: "center",
          marginTop: { xs: 2, md: 0 },
          backgroundColor: "black",
          margin: "auto",
          height: "100%",

          // width: '80%',
          // height: 'auto'
        }}
      >
        <img
          src={imageSrc}
          alt="Home"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}

HomeSection.propTypes = {
  imageSrc: PropTypes.string.isRequired,
};

export default HomeSection;
