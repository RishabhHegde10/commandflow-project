const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post(
  "/",
  authenticateToken,
  authorizeRole("admin", "manager"),
  createProduct
);

router.put(
  "/:productId",
  authenticateToken,
  authorizeRole("admin", "manager"),
  updateProduct
);

router.delete(
  "/:productId",
  authenticateToken,
  authorizeRole("admin"),
  deleteProduct
);

module.exports = router;