const express = require("express");
const router = express.Router();
const { createOrder,  verifyPayment,  getMySubscription } = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/subscription/:userId", getMySubscription);

module.exports = router;