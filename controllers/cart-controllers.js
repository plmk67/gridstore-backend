const mongoose = require("mongoose");

const getCartItems = async (req, res, next) => {
  res.json({
    cartItems: "cart items here!",
  });
};

const addCartItems = async (req, res, next) => {
  res.json({
    cartItems: "cart items here!",
  });
};

const deleteCartItems = async (req, res, next) => {
  res.json({
    cartItems: "cart items here!",
  });
};

exports.getCartItems = getCartItems;
exports.addCartItems = addCartItems;
exports.deleteCartItems = deleteCartItems;
