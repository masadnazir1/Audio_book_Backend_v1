const express = require("express");
const { sequelize } = require("./main/config/db");
const Router = require("./main/routes/Router");
const corsMiddleware = require("./main/middleware/cors");
const path = require("path");

const app = express();
app.use(corsMiddleware);
const PORT = 5000;

app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// Import Routes

// Use Router here
app.use("/api", Router);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//

// Sync the models with the database
sequelize
  .sync({ force: false }) // Set force: true to drop and re-create tables
  .then(() => {
    console.log("Models are synced with the database");
  })
  .catch((err) => {
    console.error("Error syncing models:", err);
  });

//
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
