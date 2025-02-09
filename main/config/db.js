require("dotenv").config(); // Load .env variables

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: "postgres", // Database dialect
    port: process.env.DB_PORT, // Database port
    ssl: process.env.DB_SSL === "true", // Convert string to boolean

    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL === "true",
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    },
    logging: (msg) => console.log(msg), // Log queries
  }
);

// Authenticate the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("===============================");
    console.log("||==== Database connected ===||");
    console.log("===============================");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

module.exports = { sequelize };
