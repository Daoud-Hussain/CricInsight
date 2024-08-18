import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Cover Drive', value: 15, color: '#FF4136' },
  { name: 'Cut', value: 9, color: '#FF851B' },
  { name: 'Flick', value: 33, color: '#7FDBFF' },
  { name: 'Sweep', value: 5, color: '#001f3f' },
  { name: 'Pull', value: 18, color: '#2ECC40' },
  { name: 'Others', value: 20, color: '#FFDC00' },
];

const Visualization = () => {
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: '20px', color: '#34495e', fontWeight: 'bold' }}>
        Shots Visualization
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{marginBottom: '20px' }}>
        {data.map((shot) => (
          <Grid item key={shot.name}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '20px',
                borderColor: shot.color,
                color: shot.color,
                fontWeight: 'bold',
                textTransform: 'none',
                padding: '5px 15px',
              }}
            >
              {shot.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <BarChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </Grid>
        <Grid item xs={12} md={3}>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </Grid>
        <Grid item xs={12} md={3}>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Visualization;
