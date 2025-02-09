const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:5173", // Allow localhost for development
    "https://storybook.galaxydev.pk", // Allow your storybook domain
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
};

module.exports = cors(corsOptions);
