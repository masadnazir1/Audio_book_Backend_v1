const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define the Book model
const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Categories",
      key: "id",
    },
    allowNull: false,
  },
  audio_url: {
    type: DataTypes.STRING,
  },
  narrator: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.STRING,
  },
  cover_image_url: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Book;
