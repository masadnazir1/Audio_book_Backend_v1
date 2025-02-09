const { where } = require("sequelize");
const MyShelf = require("../models/MyShelf.model");

const GetMyShelf = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    const MyPersonalShelf = await MyShelf.findAll({
      where: { user_id: user_id },
    });
    res.status(204).json({
      Sucess: "The Book sucessfully removed form your Shelf",
      MyPersonalShelf,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ Error: "Internal server error" });
  }
};

const DelMyShelf = async (req, res) => {
  try {
    const { user_id, book_id } = req.body; // Make sure book_id is also included in the request body

    if (!user_id || !book_id) {
      return res
        .status(400)
        .json({ error: "Please provide user_id and book_id" });
    }

    const deletedCount = await MyShelf.destroy({
      where: { user_id, book_id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Book not found in user's shelf" });
    }

    res.status(200).json({
      message: "The book was successfully removed from your shelf",
    });
  } catch (error) {
    console.error("Error deleting the book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Fun to add the book into the db
const AddToMyShelf = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    const ALreadyExist = await MyShelf.findOne({
      where: { user_id: user_id, book_id: book_id },
    });

    if (ALreadyExist) {
      return res.status(200).json({ ok: "This book is already in your Shelf" });
    }

    const Shelf = await MyShelf.create({
      user_id: user_id,
      book_id: book_id,
    });

    res.status(201).json({
      Sucess_message: "This book sucessfully added to your Shelf",
      Shelf,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ Error: "Internal server error" });
  }
};

module.exports = { GetMyShelf, AddToMyShelf, DelMyShelf };
