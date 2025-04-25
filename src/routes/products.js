const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multerConfig");
const sharpMiddleware = require("../middleware/sharpMiddleware");

// Create product (with optional image upload)
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  sharpMiddleware("webp", 80),
  createProduct
);

// Get all products
router.get("/", getAllProducts);

// Get single product
router.get("/:id", getProductById);

// Update product
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  sharpMiddleware("webp", 80),
  updateProduct
);

// Delete product
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
