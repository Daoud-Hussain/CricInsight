import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
import CustomButton from "./CustomButton";
import Lottie from 'react-lottie';
import loaderAnimation from './Loader.json';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import { fromEnv } from '@aws-sdk/credential-providers';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'us-west-2', // fallback to default region
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});


const VideoEditor = () => {
  const [videos, setVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);
  const fileInputRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");



  const userEmail = localStorage.getItem('userEmail');

  const addToHistory = (videos) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(videos);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleVideoUpload = (file) => {
    if (file && file.type === "video/mp4") {
      setLoading(true);
      setBlurred(true);
      const url = URL.createObjectURL(file);
      const newVideos = [...videos, { src: url, duration: 0 }];
      setVideos(newVideos);
      addToHistory(newVideos);
      setIsPlaying(false);
    } else {
      toast.error('Please upload an MP4 video file.');
    }
  };


  const onDrop = (acceptedFiles) => {
    handleVideoUpload(acceptedFiles[0]);
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "video/*",
    onDrop,
    noClick: true,
  });

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
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setVideos(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setVideos(history[historyIndex + 1]);
    }
  };


  const handleCut = () => {
    console.log("Cut clicked");
  };

  const handleAdd = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  const handleDelete = () => {
    if (selectedVideoIndex !== null) {
      const newVideos = videos.filter((_, index) => index !== selectedVideoIndex);
      setVideos(newVideos);
      addToHistory(newVideos);
      if (selectedVideoIndex === currentVideoIndex) {
        setCurrentVideoIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
      }
      setSelectedVideoIndex(null);
    }
  };

  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleDoneClick = async () => {
  
    try {
      setLoading(true);
      setUploading(true);
      console.log(import.meta.env.VITE_AWS_REGION); 

  
      // Fetch user details from backend
      const userResponse = await axios.get(`/api/username?email=${userEmail}`);
      const { firstName } = userResponse.data;
  
      // Upload each video to S3
      const uploadPromises = videos.map(async (videoFile, index) => {
        // Fetch the blob from the video source
        const response = await fetch(videoFile.src);
        const blob = await response.blob();
  
        
        const formatDate = (date) => {
          const day = String(date.getDate()).padStart(2, '0');  
          const month = String(date.getMonth() + 1).padStart(2, '0'); 
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };
        
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        
        const fileName = `${firstName.replace(/\s+/g, "_")}_video_${formattedDate}_${index}.mp4`;
        
        const key = `videos/${firstName.replace(/\s+/g, "_")}/${fileName}`;
  
        const uploadParams = {
          Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
          Key: key,
          Body: blob,
          ContentType: "video/mp4",
        };
  
        // Upload to S3
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);
  
        // Construct public URL
        return `https://${uploadParams.Bucket}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${key}`;
      });
  
      // Wait for all uploads to complete
      const videoUrls = await Promise.all(uploadPromises);
  
      // Save video URLs to user's profile
      await axios.post("/api/upload-video", {
        email: userEmail,
        videos: videoUrls.map((url) => ({
          url,
          uploadedAt: new Date(),
        })),
      });
  
      setUploadSuccess(true);
      toast.success("Videos uploaded successfully!");
      navigate("/dashboard"); // Adjust the route as needed
    } catch (err) {
      console.error("Video upload error:", err);
      toast.error("Failed to upload videos. Please try again.");
      setError(err.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`http://localhost:3001/api/username?email=${userEmail}`)
        .then((response) => {
          setUserName(response.data.firstName); // Use "firstName" from backend response
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
        });
    }


    const drawTimeline = () => {
      if (canvasRef.current && videos.length > 0) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const totalDuration = videos.reduce((sum, video) => sum + video.duration, 0);
        const frameCount = Math.floor(totalDuration / 0.5);
        const interval = 0.5;
        const spacing = 1;

        canvas.width = Math.max(canvas.clientWidth, frameCount * 5 + (videos.length - 1) * spacing);  // Ensure the canvas is wide enough
        canvas.height = canvas.clientHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);

        let currentTime = 0;
        let currentX = 0;

        videos.forEach((video, index) => {
          const videoFrameCount = Math.floor(video.duration / interval);
          const videoWidth = (videoFrameCount * canvas.width) / frameCount;
          const x = currentX;
          const y = 30;
          const height = canvas.height - 30;

          // Draw video block
          context.fillStyle = index === currentVideoIndex ? "#4CAF50" : "#2196F3";
          context.fillRect(x, y, videoWidth, height);

          // Draw black border for selected video
          if (index === selectedVideoIndex) {
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.strokeRect(x, y, videoWidth, height);
          }

          // Draw time indicators
          context.fillStyle = "black";
          for (let i = 0; i <= videoFrameCount; i += 2) {
            const indicatorX = x + (i * interval * videoWidth) / video.duration;
            context.fillRect(indicatorX, 25, 1, 5);
            if (i % 4 === 0) {
              context.fillText(`${Math.floor(currentTime + i * interval)}s`, indicatorX, 20);
            }
          }

          currentTime += video.duration;
          currentX += videoWidth + spacing;
        });

        setLoading(false);
        setBlurred(false);
      }


    };

    if (videos.length > 0) {
      const video = document.createElement('video');
      video.src = videos[videos.length - 1].src;
      video.onloadedmetadata = () => {
        setVideos(prevVideos => {
          const newVideos = [...prevVideos];
          newVideos[newVideos.length - 1].duration = video.duration;
          return newVideos;
        });
        drawTimeline();
      };
    }
  }, [videos, userEmail, currentVideoIndex, selectedVideoIndex]);

  const handleTimelineClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const spacing = 1;

    let accumulatedWidth = 0;
    for (let i = 0; i < videos.length; i++) {
      const videoWidth = (videos[i].duration / videos.reduce((sum, video) => sum + video.duration, 0)) * canvas.width;
      if (x >= accumulatedWidth && x < accumulatedWidth + videoWidth) {
        setSelectedVideoIndex(i);
        break;
      }
      accumulatedWidth += videoWidth + spacing;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      sx={{ padding: 3 }}
    >
      <ToastContainer />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        sx={{ filter: blurred ? "blur(8px)" : "none" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          mt={1}
        >
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
            Upload Videos
          </Typography>
          <CustomButton
            title={videos.length > 0 ? "Done" : "Upload"}
            IconComponent={FileUploadOutlinedIcon}
            onClick={videos.length > 0 ? handleDoneClick : handleAdd}
          />
        </Box>

        <Box
          mt={3}
          component="video"
          ref={videoRef}
          width="100%"
          height="50%"
          bgcolor="#d3d3d3"
          controls
          src={videos[currentVideoIndex]?.src}
        />
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <IconButton onClick={handleRewind}><FastRewindIcon /></IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton onClick={handleFastForward}><FastForwardIcon /></IconButton>
          <IconButton onClick={handleFullscreen}><FullscreenIcon /></IconButton>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          mt={2}
          borderTop="1px solid #ccc"
        >
          <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center">
            <IconButton onClick={handleUndo}><UndoIcon /></IconButton>
            <IconButton onClick={handleRedo}><RedoIcon /></IconButton>
            {/* <IconButton onClick={handleCut}><ContentCutIcon /></IconButton> */}
            <IconButton onClick={handleAdd}><AddIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
          </Box>
        </Box>

        <Box
          ref={timelineRef}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mt={2}
          width="100%"
          height="100px"
          borderTop="1px solid #ccc"
          position="relative"
          overflow="auto"
          sx={{
            borderRadius: 1,
            backgroundColor: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          onClick={handleTimelineClick}
        >
          <canvas ref={canvasRef} style={{ height: "100%" }} />
          {videos.length === 0 && (
            <Box {...getRootProps()} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input {...getInputProps()} />
              <Typography variant="h6" color="textSecondary">
                {isDragActive ? "Drop the video here ..." : "Drag and drop a video file here, or click to select one"}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {loading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bgcolor="white"
          p={2}
          borderRadius={2}
        >
          <Lottie
            options={{
              animationData: loaderAnimation,
              loop: true,
              autoplay: true,
              speed: 10
            }}
            height={100}
            width={100}
          />
          <Typography variant="h6" align="center">
            Uploading video...
          </Typography>
        </Box>
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="video/*"
        onChange={handleFileInputChange}
      />
    </Box>
  );
};

export default VideoEditor;
