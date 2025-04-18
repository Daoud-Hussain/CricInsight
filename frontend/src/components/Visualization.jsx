import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from "recharts";
import axios from "axios";
import CustomButton from "./CustomButton";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import loaderAnimation from "./Loader.json";
import Lottie from "react-lottie";
import {  Zoom } from 'react-toastify';

const Visualization = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dates, setDates] = useState([]);
  const [componentKey, setComponentKey] = useState(0);
  const [blurred, setBlurred] = useState(false);
  const [data, setData] = useState([
    { name: "Cut", value: 0, color: "#332971" },
    { name: "Pull", value: 0, color: "#46399c" },
    { name: "Cover Drive", value: 0, color: "#0d0a1c" },
    { name: "Straight Drive", value: 0, color: "#201a47" },
    { name: "Flick", value: 0, color: "#5948c6" },
  ]);
  const [loading, setLoading] = useState(false);

  // Fetch stats from DynamoDB on initial load
  const fetchLastVideoAnalysis = async () => {
    setLoading(true);
    setBlurred(true);

    try {
      const response = await axios.get(
        "https://cricinsight-backend.vercel.app/api/video/last-analysis"
      );
      if (response.data && response.data.ShotPercentages) {
        const updatedData = Object.entries(response.data.ShotPercentages).map(
          ([shotName, percentage]) => {
            const formattedName = shotName
              .split("_")
              .map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(" ");
            const existingShot = data.find(
              (d) => d.name === formattedName
            );
            return {
              name: formattedName,
              value: Number(percentage),
              color: existingShot
                ? existingShot.color
                : "#6c58f1",
            };
          }
        );
        setData(updatedData);
        toast.success("Data loaded Successfully!");
      }
    } catch (error) {
      console.error("Error fetching video analysis:", error);
      toast.error("Failed to fetch video analysis");
    } finally {
      setLoading(false);
      setBlurred(false);
    }
  };

  // Fetch available dates from MongoDB
  const fetchDates = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    try {
      const response = await axios.get(
        `https://cricinsight-backend.vercel.app/api/user/getshots?email=${email}`
      );
      setDates(response.data);
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  // Fetch stats for a specific date from MongoDB
  const fetchStatsByDate = async (date) => {
    setLoading(true);
    setBlurred(true);

    try {
      const email = localStorage.getItem("userEmail");
      const response = await axios.get(
        `https://cricinsight-backend.vercel.app/api/user/getshotsbydate?email=${email}&date=${date}`
      );
      const { shots } = response.data;
      const updatedData = shots.map((shot) => ({
        name: shot.name,
        value: parseFloat(shot.percentage),
        color: data.find((d) => d.name === shot.name)?.color || "#6c58f1",
      }));
      setData(updatedData);
      // toast.success("Data loaded from MongoDB!");
    } catch (error) {
      console.error("Error fetching stats by date:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
      setBlurred(false);
    }
  };

  // Handle dropdown change
  const handleCategoryChange = async (event) => {
    const selectedDate = event.target.value;
    setSelectedCategory(selectedDate);
    fetchStatsByDate(selectedDate);
  };

  // Reload data from DynamoDB
  // const reloadData = () => {
  //   setSelectedCategory("");
  //   // fetchLastVideoAnalysis();
  // };

  useEffect(() => {
    fetchLastVideoAnalysis();
    fetchDates();
  }, []);

  const saveShotsData = async () => {
    try {
      const total = data.reduce((sum, entry) => sum + entry.value, 0);

      const updatedShots = data.map((shot) => ({
        name: shot.name,
        percentage: ((shot.value / total) * 100).toFixed(2),
      }));

      const updatedShotsData = {
        date: new Date().toISOString(),
        email: localStorage.getItem("userEmail"),
        shots: updatedShots,
      };

      await axios.post("https://cricinsight-backend.vercel.app/api/user/saveshots", updatedShotsData);
      toast.success("Data Saved Successfully!");
    } catch (error) {
      console.error("Error saving shots data:", error);
      toast.error("Error saving data.");
    }
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const percentage = Math.round((value / total) * 100);
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#333"
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  const reloadData = async () => {
    setComponentKey((prevKey) => prevKey + 1); // Trigger re-render
    await fetchDates(); // Fetch the latest dates from the server
    setSelectedCategory(""); // Reset the selected category
    console.log("Data reloaded");
  };
  

  return (
    <Box
      key={componentKey}
      sx={{
        px: "20px",
        py: "35px",
        borderRadius: "8px",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
     <ToastContainer
        transition={Zoom}
      />
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: '8%',
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Lottie
              options={{
                animationData: loaderAnimation,
                loop: true,
                autoplay: true,
              }}
              height={100}
              width={100}
            />
            <Typography variant="h6" align="center" >
              Loading data...
            </Typography>
          </Box>
        </Box>
      )}
      <Typography
        variant="h5"
        align="center"
        sx={{
          marginBottom: "20px", fontWeight: "bold", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        }}
      >
        Shots Visualization
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={7} sx={{ textAlign: "center" }}>
          <Grid container spacing={2} justifyContent="center">
            {data.map((shot) => (
              <Grid item key={shot.name}>
                <button
                  style={{
                    borderRadius: "20px",
                    borderColor: shot.color,
                    color: shot.color,
                    fontWeight: "bold",
                    textTransform: "none",
                    padding: "5px 15px",
                  }}
                >
                  {shot.name}
                </button>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="date-label">Date</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Date"
            >
              {dates.slice().reverse().map((item) => {
                const formattedDate = new Date(item.date).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <MenuItem key={item.date} value={item.date}>
                    {formattedDate}
                  </MenuItem>
                );
              })}
            </Select>

          </FormControl>
        </Grid>


        <Grid item xs={12} md={2}>
          <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
            <RefreshIcon
              onClick={reloadData}
              sx={{
                padding: "5px",
                borderRadius: "50%",
                width: 35,
                height: 35,
                cursor: "pointer",
                color: '#030947',
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            />

            <CustomButton
              title="Save"
              onClick={saveShotsData}
              IconComponent={FileDownloadOutlinedIcon}
            />

          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ paddingTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <BarChart width={600} height={400} data={data} borderRadius="20">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" radius={[25, 25, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </Grid>

        <Grid item xs={12} md={4}>
          <PieChart width={275} height={225}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={1}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <PieChart width={275} height={225}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={43}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Grid>
      </Grid>
    </Box>


  );
};

export default Visualization;