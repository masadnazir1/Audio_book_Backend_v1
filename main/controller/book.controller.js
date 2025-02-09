const Category = require("../models/category.model"); // Import models

const Book = require("../models/book.model"); // Import models

// Controller to fetch all books with category
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: [
        "id",
        "title",
        "author",
        "audio_url",
        "narrator",
        "duration",
        "cover_image_url",
        "description",
        "created_at",
      ],
      include: {
        model: Category,
        // as: "category",
        attributes: ["name"], // Fetch the category name,
        required: false,
      },
    });

    console.log("Books fetched successfully", books.length);
    return res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ message: "Error fetching books" });
  }
};

module.exports = {
  getAllBooks,
};
