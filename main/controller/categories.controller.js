const Category = require("../models/category.model");

const GetAllCategories = async (req, res) => {
  try {
    const Categories = await Category.findAll();
    res.status(200).json(Categories);
  } catch (error) {
    console.error("error fetching the categories", error);
    res.status(500).json({ Error: "Enternal serrver error" });
  }
};

module.exports = { GetAllCategories };
