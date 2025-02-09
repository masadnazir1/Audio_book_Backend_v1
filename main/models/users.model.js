const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Enforce unique email
      validate: {
        isEmail: true, // Validate email format
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false, // Password should be required
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    tableName: "users",
  }
);

module.exports = Users;
