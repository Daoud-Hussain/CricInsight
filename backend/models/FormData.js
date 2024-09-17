const mongoose = require('mongoose');

const ShotDataSchema = new mongoose.Schema({
  shotType: { type: String, required: true }, 
  percentage: { type: Number, required: true }, 
  totalShots: { type: Number, required: true }, 
});

const VideoAnalysisSchema = new mongoose.Schema({
  date: { type: Date, required: true },
//   videos: [{ type: String, required: true }], 
  shots: [ShotDataSchema], 
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  videoAnalysis: [VideoAnalysisSchema], 
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
