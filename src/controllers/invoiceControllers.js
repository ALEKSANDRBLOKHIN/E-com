const Invoice = require("../models/invoiceModel");

exports.createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      customerName,
      items,
      totalAmount,
      status,
      dueDate
    } = req.body;

    const newInvoice = new Invoice({
      invoiceNumber,
      customerName,
      items,
      totalAmount,
      status,
      dueDate
    });

    const savedInvoice = await newInvoice.save();

    res.status(201).json({
      message: "Invoice created successfully",
      invoice: savedInvoice
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("items.productId", "name price");
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("items.productId", "name price");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error getting invoice:", error);
    res.status(500).json({ message: "Server error" });
  }
};
