const express = require("express");
const router = express.Router();
const { sendOtp, resetPassword } = require("../controllers/authController");
const { changePassword } = require("../controllers/changePasswordController");
const verifyIndividual = require("../middleware/individualAuthMiddleware");
const verifyToken = require("../middleware/authMiddleware");

router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);
router.post("/change-password/individual", verifyIndividual, changePassword);
router.post("/change-password/organization", verifyToken, changePassword);

module.exports = router;
