const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order-controllers");

router.post("/", orderControllers.createOrder);
router.get("/:id", orderControllers.getOrderById);
router.get("/items/:id", orderControllers.getOrderItemsById);
router.patch("/items/:id", orderControllers.updateOrderById);
router.post(
  "/shipping-address/:id",
  orderControllers.updateOrderShippingAddress
);
router.post("/billing-address/:id", orderControllers.updateOrderBillingAddress);

module.exports = router;
