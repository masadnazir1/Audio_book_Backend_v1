const express = require("express");
const router = express.Router();
const { Upload } = require("../controller/upload.controller");
const {
  getSegment,
  getSegmentMeta,
} = require("../controller/stream.controller");
const { getAllBooks } = require("../controller/book.controller");
const GetCover = require("../controller/covers.controller");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/users.controller");

const {
  GetMyShelf,
  AddToMyShelf,
  DelMyShelf,
} = require("../controller/Myshelf.controller");
const SearchBooks = require("../controller/Search.controller");
const { GetAllCategories } = require("../controller/categories.controller");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/Gategories.controller");

// Define routes
router.get("/GetMeta/:category/:bookTitle/segments", getSegmentMeta);
router.get("/GetAllBooks", getAllBooks);
router.get("/GetSeg/:category/:bookTitle/:segmentIndex", getSegment);
router.post("/Upload", Upload);
router.post("/create", createUser);
router.get("/users", getAllUsers);
router.get("/GetMyShelf", GetMyShelf);
router.post("/AddToMyShelf", AddToMyShelf);
router.delete("/DelMyShelf", DelMyShelf);
router.get("/BooksCover/:category/:bookTitle/:imageName", GetCover);
// router.get("/categories", GetAllCategories);
router.get("/searchBook", SearchBooks);
router.get("/users/:id", getUserById);

// Update a user by ID
router.put("/users/:id", updateUser);

// Delete a user by ID
router.delete("/users/:id", deleteUser);
//Categories routes
router.get("/categories", getAllCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
