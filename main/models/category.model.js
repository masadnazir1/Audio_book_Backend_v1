const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Import your Sequelize instance

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.BIGINT, // Use BIGINT to match int8 type
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255), // Max length 255 for the category name
    allowNull: true, // Allows null value
  },
  createdAt: {
    type: DataTypes.DATE, // Use DATE type for timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set to the current timestamp
    field: "createdat", // Mapping to the column name 'createdat' in the table
  },
  updatedAt: {
    type: DataTypes.DATE, // Use DATE type for timestamp
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set to the current timestamp
    field: "updatedat", // Mapping to the column name 'updatedat' in the table
  },
});

// Import Book model **after** defining the Category model
const Book = require("./book.model");

// Define associations in **only one place**
Category.hasMany(Book, { foreignKey: "category_id" });
Book.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Category;
