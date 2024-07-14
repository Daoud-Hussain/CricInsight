import React, { useState, useRef } from "react";
import { Button, Box, IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const VideoInsight = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
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
        ref={videoRef}
        width="80%"
        height="auto"
        bgcolor="#d3d3d3"
        controls
        src={videoSrc}
      />
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <IconButton onClick={handleRewind}>
          <FastRewindIcon />
        </IconButton>
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={handleFastForward}>
          <FastForwardIcon />
        </IconButton>
        <IconButton onClick={handleFullscreen}>
          <FullscreenIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoInsight;
