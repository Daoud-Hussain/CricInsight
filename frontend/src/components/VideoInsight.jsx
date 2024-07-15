import React, { useState, useRef } from "react";
import { Button, Box, IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AddIcon from "@mui/icons-material/Add";
// import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteIcon from "@mui/icons-material/Delete";

const VideoInsight = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsPlaying(false); // Reset playing state when a new video is uploaded
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
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  // Dummy handlers for new buttons
  const handleUndo = () => {
    console.log("Undo clicked");
  };

  const handleRedo = () => {
    console.log("Redo clicked");
  };

  const handleCut = () => {
    console.log("Cut clicked");
  };

  const handleCopy = () => {
    console.log("Copy clicked");
  };

  const handlePaste = () => {
    console.log("Paste clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{ backgroundColor: "#f5f5f5", pAddIconing: 3 }}
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
      <Box display="flex" width= "100%" justifyContent="flex-start" borderTop={1}px solid alignItems="center" mt={2}>
        <IconButton onClick={handleUndo}> 
          <UndoIcon />
        </IconButton>
        <IconButton onClick={handleRedo}>
          <RedoIcon />
        </IconButton>
        <IconButton onClick={handleCut}>
          <ContentCutIcon />
        </IconButton>
        <IconButton onClick={handlePaste}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoInsight;
