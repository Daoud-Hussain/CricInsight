const AWS = require('aws-sdk');

// Set AWS region and credentials
AWS.config.update({
  region: 'ap-south-1', // Replace with your S3 region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Store credentials in environment variables for security
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

module.exports = s3;
