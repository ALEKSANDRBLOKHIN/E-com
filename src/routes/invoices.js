const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById
} = require("../controllers/invoiceControllers");

// Create a new invoice
router.post("/", verifyToken, createInvoice);

// Get all invoices
router.get("/", verifyToken, getAllInvoices);

// Get a specific invoice by ID
router.get("/:id", verifyToken, getInvoiceById);

// Test route to check token (опционально)
router.post("/test", verifyToken, (req, res) => {
  console.log(req.userId);
  res.send("Invoice test successful");
});

module.exports = router;
