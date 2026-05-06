const express = require("express");
const router = express.Router();
const { createOrder,  verifyPayment,  getMySubscription, getMyCertificates } = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/subscription/:userId", getMySubscription);
router.get("/my-certificates/:userId", getMyCertificates);

module.exports = router;