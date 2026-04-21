require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const filePath = "test.jpg";
if (fs.existsSync(filePath)) {
  cloudinary.uploader.upload(filePath, { folder: "test_upload" })
    .then(result => console.log("Upload success:", result.url))
    .catch(err => console.error("Upload error:", err));
} else {
  console.log("File test.jpg does not exist. Please provide a valid image file.");
}