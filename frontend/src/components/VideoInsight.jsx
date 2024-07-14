import React, { useState } from "react";
import { Button, Box, IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const VideoInsight = () => {
  const [videoSrc, setVideoSrc] = useState("");

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{ backgroundColor: "#f5f5f5", padding: 3 }}
    >
      <Box display="flex" justifyContent="flex-end" width="100%" mb={2}>
        <input
          accept="video/*"
          style={{ display: "none" }}
          id="video-upload"
          type="file"
          onChange={handleVideoUpload}
        />
        <label htmlFor="video-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<UploadFileIcon />}
          >
            Upload Video
          </Button>
        </label>
      </Box>
      <Box
        component="video"
        width="80%"
        height="auto"
        bgcolor="#d3d3d3"
        controls
        src={videoSrc}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <IconButton>
          <FastRewindIcon />
        </IconButton>
        <IconButton>
          <PlayArrowIcon />
        </IconButton>
        <IconButton>
          <FastForwardIcon />
        </IconButton>
        <IconButton>
          <FullscreenIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoInsight;
