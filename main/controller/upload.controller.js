const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { insertBook } = require("../Utils/dbUtils"); // Import DB function

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category, bookTitle } = req.body;
    const bookDir = `uploads/${category}/${bookTitle}`;
    fs.mkdirSync(bookDir, { recursive: true });
    fs.mkdirSync(`${bookDir}/segments`, { recursive: true });
    cb(null, bookDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Function to split audio using FFmpeg
const splitAudio = (filePath, outputDir, duration = 30) => {
  return new Promise((resolve, reject) => {
    let segmentPaths = [];

    ffmpeg(filePath)
      .outputOptions([
        "-f segment", // Enable segmenting
        `-segment_time ${duration}`, // Duration of each segment in seconds
        "-c copy", // Copy audio without re-encoding
      ])
      .output(`${outputDir}/segment_%03d.mp3`) // Save segments as segment_001.mp3, segment_002.mp3, etc.
      .on("end", () => {
        segmentPaths = fs.readdirSync(outputDir).map((file) => file);
        resolve(segmentPaths);
      })
      .on("error", (err) => reject(err))
      .run();
  });
};

// Upload & Segment the Book
const Upload = async (req, res) => {
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { category, bookTitle, bookDescription, author, narrator, duration } =
      req.body;
    const bookDir = `uploads/${category}/${bookTitle}`;

    if (!req.files || !req.files["audio"]) {
      return res.status(400).json({ error: "Audio file is required" });
    }

    const audioFilePath = path.join(bookDir, req.files["audio"][0].filename);
    const coverImagePath = req.files["coverImage"]
      ? `/uploads/${category}/${bookTitle}/${req.files["coverImage"][0].filename}`
      : null;
    const segmentDir = `${bookDir}/segments`;

    try {
      // Split the audio file into segments
      const segments = await splitAudio(audioFilePath, segmentDir);

      // Define book details
      const bookData = {
        title: bookTitle,
        author,
        narrator,
        duration,
        categoryName: category,
        audioUrl: `/uploads/${category}/${bookTitle}/${req.files["audio"][0].filename}`,
        coverImageUrl: coverImagePath,
        description: bookDescription,
      };

      console.log("ImageUrl", bookData.coverImageUrl);

      // Insert book details into PostgreSQL
      const insertedBook = await insertBook(bookData);

      res.json({
        message: "Book uploaded & segmented",
        bookId: insertedBook.id,
        metadata: insertedBook,
      });
    } catch (error) {
      console.error("Error processing book upload:", error);
      res.status(500).json({ error: "Error processing audio file" });
    }
  });
};

module.exports = { Upload };
