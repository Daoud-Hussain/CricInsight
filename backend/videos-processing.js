const express = require('express');
const router = express.Router();
const UserModel = require('./FormData');

// Save video analysis data for a logged-in user
router.post('/save-video-analysis', async (req, res) => {
    const { email, date, shots } = req.body;
    console.log('Request body:', req.body); // Add this line
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.videoAnalysis.push({
        date: new Date(date),
        // videos,
        shots
      });
  
      await user.save();
      res.status(200).json({ message: 'Video analysis saved successfully' });
    } catch (error) {
      console.error('Error:', error); // Enhanced error logging
      res.status(500).json({ message: 'Error saving video analysis' });
    }
  });
  

module.exports = router;
