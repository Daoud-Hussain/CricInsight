const mongoose = require('mongoose');

const ShotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  date: { type: Date, required: true },
});

const VideoSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return /^(https?:\/\/[^\s]+)$/.test(v); // Valid URL regex
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  uploadedAt: { type: Date, required: true, default: Date.now },
  videoNumber: { 
    type: Number, 
    required: false, 
    default: 0, 
    // Remove unique constraint
  },
});


const ShotsPlayedSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  shots: [ShotSchema],
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    videos: { type: [VideoSchema], default: [] }, // Default to an empty array
    shotsPlayed: [ShotsPlayedSchema],
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
