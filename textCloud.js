require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

cloudinary.uploader.upload("test.jpg", { folder: "test_upload" })
  .then(result => console.log("Upload success:", result.url))
  .catch(err => console.error("Upload error:", err.message));