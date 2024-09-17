import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import axios from 'axios'; 

const data = [
  { name: 'Cover Drive', value: 14, color: '#0d0a1c' }, 
  { name: 'Cut', value: 30, color: '#332971' },          
  { name: 'Flick', value: 12, color: '#5948c6' },       
  { name: 'Sweep', value: 24, color: '#6c58f1' },        
  { name: 'Pull', value: 8, color: '#46399c' },        
  { name: 'Others', value: 13, color: '#201a47' },      
];

const dates = [
  { date: 'Oct 12, 2024' },       
  { date: 'Sept 04, 2024' },       
  { date: 'April 24, 2024' },       
  { date: 'Feb 14, 2024' },       
  { date: 'Jan 10, 2024' },       
];

const Visualization = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Handle category change (Date)
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to save the video analysis data
  const saveVideoAnalysis = async () => {
    const user = JSON.parse(localStorage.getItem('userEmail')); // Get user data from local storage

    if (!user) {
      alert('User not logged in');
      return;
    }

    const shots = data.map((shot) => ({
      shotType: shot.name,
      percentage: (shot.value / data.reduce((sum, entry) => sum + entry.value, 0)) * 100,
      totalShots: shot.value
    }));

    const videoAnalysisData = {
      email: user.email, // assuming email is saved in localStorage
      date: selectedCategory || new Date(), // use selected date or current date
      // videos: ['video1_url', 'video2_url'], // Replace with actual video URLs
      shots
    };

    try {
      const response = await axios.post('http://localhost:3001/save-video-analysis', videoAnalysisData);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error saving video analysis');
    }
  };

  // const renderCustomizedLabel = ({ x, y, width, height, value }) => (
  //   <text x={x + width / 2} y={y - 10} fill="#000" textAnchor="middle">
  //     {value}
  //   </text>
  // );
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


  // Automatically save data when the component is mounted
  useEffect(() => {
    saveVideoAnalysis();
  }, []); // Empty dependency array ensures it runs only once when the component is mounted

  return (
    <Box sx={{ px: '20px', py: '35px', borderRadius: '8px', fontFamily: "Poppins, sans-serif" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Shots Visualization
      </Typography>

      {/* Rest of your code for visualization */}
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
          <Grid container spacing={2} justifyContent="center">
            {data.map((shot) => (
              <Grid item key={shot.name}>
                <button
                  style={{
                    borderRadius: '20px',
                    borderColor: shot.color,
                    color: shot.color,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    padding: '5px 15px',
                  }}
                >
                  {shot.name}
                </button>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="date-label">Date</InputLabel>
            <Select
              sx={{ borderRadius: 15, maxHeight: 55 }}
              labelId="date-label"
              id="date"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Date"
            >
              {dates.map((item) => (
                <MenuItem key={item.date} value={item.date} >
                  {item.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Charts... */}
      <Grid container spacing={4} sx={{ paddingTop: '20px' }}>
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
