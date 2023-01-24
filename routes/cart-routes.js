const express = require("express");
const router = express.Router();

router.get("/cart", cartControllers.getCartItems);
router.post("/cart/:product_id", cartControllers.addCartItem);
router.delete("/cart/:product_id", cartControllers.deleteCartItem);

module.exports = router;
