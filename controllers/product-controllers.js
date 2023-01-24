const Product = require("../models/product");
const HttpError = require("../models/http-error");

const getProducts = async (req, res, next) => {
  let products;

  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError("Could not find products", 404);
    return next(error);
  }

  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProductById = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
  } catch (err) {
    const error = new HttpError("Could not find product", 404);
    return next(error);
  }
  res.json({
    product: product,
  });
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
