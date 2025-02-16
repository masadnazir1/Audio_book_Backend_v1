const Book = require("../models/book.model");
const Category = require("../models/category.model");
const { Op } = require("sequelize");

const SearchBooks = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    // Search books using partial match (case-insensitive) and include category
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } }, // Matches partial title
          { author: { [Op.iLike]: `%${query}%` } }, // Matches partial author
          { description: { [Op.iLike]: `%${query}%` } }, // Matches partial description
        ],
      },
      include: {
        model: Category,
        attributes: ["name"], // Fetch category name
        required: false, // Include category even if a book has no category
      },
    });

    return res.json({ results: books });
  } catch (error) {
    console.error("Unable to search the books", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = SearchBooks;
