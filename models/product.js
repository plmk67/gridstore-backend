const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  SKU: { type: String, required: true },
  product_name: { type: String, required: true },
  slug: { type: String, required: true },
  published: { type: Boolean, required: true },
  image: { type: String, required: true },
  cost: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema, "products");
