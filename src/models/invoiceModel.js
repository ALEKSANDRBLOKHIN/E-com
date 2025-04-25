const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["paid", "pending", "cancelled"], default: "pending" },
  issuedAt: { type: Date, default: Date.now },
  dueDate: { type: Date }
}, { timestamps: true });

invoiceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Invoice", invoiceSchema);
