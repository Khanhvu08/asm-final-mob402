const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userEmail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    productPrice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
 
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const invoiceModel = mongoose.model("invoice", invoiceSchema);

module.exports = invoiceModel;

