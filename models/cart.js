const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//see if Cart needs a schema

const cartSchema = new Schema({
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Cart", cartSchema, "cart");
