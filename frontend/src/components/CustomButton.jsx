import React, { useState } from "react";
import { IconButton, Box } from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';


const CustomButton = ({ title = "Upload", onClick, sx }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        border: "2px solid #030947",
        padding: "4px 20px",
        borderRadius: "30px",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        fontWeight: "600",
        backgroundColor: hover ? "#030947" : "transparent",
        color: hover ? "white" : "#030947",
        ...sx,
      }}
    >
      {title}
      <Box
        sx={{
          position: "absolute",
          top: "-12px",
          right: "-12px",
          backgroundColor: hover ? "rgba(63,81,181,0.2)" : "#fff",
          borderRadius: "50%",
          border: "1px solid #030947",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: hover ? "#030947" : "#fff",
            padding: "2px",
            transition: "background-color 0.3s",
          }}
        >
          {title === "Done" ? (
            <DownloadDoneOutlinedIcon sx={{ color: hover ? "#fff" : "#030947" }} />
          ) : (
            <FileUploadOutlinedIcon sx={{ color: hover ? "#fff" : "#030947" }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomButton;
