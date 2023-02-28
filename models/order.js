const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billingAddressSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  city: { type: String },
  country: { type: String },
  line1: { type: String },
  line2: { type: String },
  postalCode: { type: String },
  state: { type: String },
});

const shippingAddressSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  city: { type: String },
  country: { type: String },
  line1: { type: String },
  line2: { type: String },
  postalCode: { type: String },
  province: { type: String },
});

const orderSchema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  billingAddress: billingAddressSchema,
  shippingAddress: shippingAddressSchema,
  shippingCost: { type: Number },
  shippingMethod: { type: String },
  lineItems: { type: Array },
  paymentStatus: { type: String },
});

module.exports = mongoose.model("Order", orderSchema, "orders");
