const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const MyShelf = sequelize.define(
  "MyShelf",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Add this to automatically include createdAt and updatedAt fields
    tableName: "MyShelf",
  }
);

module.exports = MyShelf;
