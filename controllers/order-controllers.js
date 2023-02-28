require("dotenv").config();
const Order = require("../models/order");
const HttpError = require("../models/http-error");
const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",

  // Optional depending on the providers

  apiKey: process.env.GOOGLE_API, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

const createOrder = async (req, res, next) => {
  const { lineItems } = req.body;

  const newOrder = new Order({
    lineItems,
  });

  try {
    await newOrder.save();
  } catch (err) {
    const error = new HttpError(
      "Create new order failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    order: newOrder.toObject({ getters: true }),
  });
};

const updateOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  const { lineItems } = req.body;

  try {
    updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { lineItems: lineItems },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError("Could not update order", 404);
    return next(error);
  }

  res.json({
    // order: updatedOrder.toObject({ getters: true }),
    order: updatedOrder,
    checkoutSessionId: orderId,
  });
};

const getOrderItemsById = async (req, res, next) => {
  let orderId = req.params.id;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError("Could not find product", 404);
    return next(error);
  }
  res.json({
    cartItems: order,
    checkoutSessionId: orderId,
  });
};

const getOrderById = async (req, res, next) => {
  let orderId = req.params.id;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError("Could not find product", 404);
    return next(error);
  }

  const address = await geocoder.geocode(order.shippingAddress.line1);

  res.json({
    order: order,
    checkoutSessionId: orderId,
    address: address,
  });
};

const updateOrderShippingAddress = async (req, res, next) => {
  let orderId = req.params.id;
  const { shippingAddress, phoneNumber, email, firstName, lastName } = req.body;

  try {
    updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
        email: email,
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError("Could not update order", 404);
    return next(error);
  }
  res.json({
    order: updatedOrder,
    checkoutSessionId: orderId,
  });
};

const updateOrderBillingAddress = async (req, res, next) => {
  let orderId = req.params.id;
  const { billingAddress } = req.body;

  try {
    updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        billingAddress: billingAddress,
      },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError("Could not update order", 404);
    return next(error);
  }
  res.json({
    order: updatedOrder,
    checkoutSessionId: orderId,
  });
};

exports.createOrder = createOrder;
exports.updateOrderById = updateOrderById;
exports.getOrderItemsById = getOrderItemsById;
exports.getOrderById = getOrderById;
exports.updateOrderShippingAddress = updateOrderShippingAddress;
exports.updateOrderBillingAddress = updateOrderBillingAddress;
