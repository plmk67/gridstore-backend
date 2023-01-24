const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product-controllers");

router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProductById);

module.exports = router;
