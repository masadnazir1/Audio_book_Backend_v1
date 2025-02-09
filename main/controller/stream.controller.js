const fs = require("fs").promises; // Use fs.promises for async/await
const path = require("path");

// Route to fetch audio segments
const getSegment = async (req, res) => {
  const { category, bookTitle, segmentIndex } = req.params;

  console.log(category, bookTitle, segmentIndex);
  if (!category || !bookTitle || !segmentIndex) {
    return res.status(400).json({ Error: "send full data in req parameter" });
  }

  const segmentPath = path.join(
    __dirname,
    `../../uploads/${category}/${bookTitle}/segments/segment_${segmentIndex.padStart(
      3,
      "0"
    )}.mp3`
  );

  try {
    await fs.access(segmentPath);
    res.setHeader("Content-Type", "audio/mpeg");
    res.sendFile(segmentPath);
  } catch (error) {
    return res.status(404).json({ error: "Segment not found" });
  }
};

// Route to get metadata about available segments
const getSegmentMeta = async (req, res) => {
  const { category, bookTitle } = req.params;
  console.log(category, bookTitle);

  const segmentDir = path.join(
    process.cwd(),
    `uploads/${category}/${bookTitle}/segments`
  );
  console.log("segmentDir ", segmentDir);

  try {
    // Check if directory exists asynchronously
    await fs.access(segmentDir);
    const segmentFiles = await fs.readdir(segmentDir);

    const filteredSegmentFiles = segmentFiles
      .filter((file) => file.startsWith("segment_") && file.endsWith(".mp3"))
      .map((file) => file.match(/segment_(\d{3})\.mp3/)[1]) // Extract numeric part
      .sort();

    res.json({ segments: filteredSegmentFiles });
  } catch (error) {
    // If directory doesn't exist
    return res.status(404).json({ error: "No segments found" });
  }
};

module.exports = { getSegment, getSegmentMeta };
