const mongoose  = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    productPrice: {
      type: Number,
      require: true,
    },
    imgProduct: {
      type: String,
      required: true,
    },
    productColor: {
      type: String,
      require: true,
    },
    productType: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
