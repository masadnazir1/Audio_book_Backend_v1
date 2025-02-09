const Book = require("../models/book.model"); // Import Sequelize models
const Category = require("../models/category.model"); // Import Sequelize models

/**
 * Inserts a new book into the database.
 * @param {Object} bookData - Book details.
 * @returns {Promise<Object>} - Inserted book details.
 */
const insertBook = async (bookData) => {
  console.log("This is the book data", bookData);
  try {
    // Step 1: Try to find the category
    let category = await Category.findOne({
      where: { name: bookData.categoryName },
    });
    // Step 2: If the category doesn't exist, create a new one
    if (!category) {
      category = await Category.create({
        name: bookData.categoryName,
        createdat: new Date(),
        updatedat: new Date(),
      });
      console.log("New category created:", category);
    } else {
      console.log("Category already exists:", category);
    }

    console.log("This is the category", category.id);

    // Create a new book and associate it with the category
    const newBook = await Book.create({
      title: bookData.title,
      author: bookData.author,
      narrator: bookData.narrator,
      duration: bookData.duration,
      category_id: category.id, // The foreign key to associate with the Category// category.id
      audio_url: bookData.audioUrl,
      cover_image_url: bookData.coverImageUrl,
      description: bookData.description,
    });

    return newBook; // Return the inserted book
  } catch (error) {
    console.error("Error inserting book:", error);
    throw error;
  }
};

module.exports = { insertBook };
