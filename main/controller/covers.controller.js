const express = require("express");
const path = require("path");
const router = express.Router();

const GetCover = (req, res) => {
  const { category, bookTitle, imageName } = req.params;

  // Decode URL-encoded image name
  const decodedImageName = decodeURIComponent(imageName);

  console.log("Requested Image:", category, bookTitle, decodedImageName);

  // Use absolute path instead of relative

  const imagePath = path.resolve(
    __dirname,
    "../uploads",
    category,
    bookTitle,
    decodedImageName
  );

  console.log(imagePath);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).json({ error: "Image not found" });
    }
  });
};

module.exports = GetCover;
