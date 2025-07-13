const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { registerOrganization } = require('../controllers/orgAuthController');
const { loginOrganization } = require("../controllers/authController");
const { getProfile, updateProfile } = require('../controllers/profileController');
const { sendOtp, resetPassword } = require("../controllers/authController");

router.post('/register', registerOrganization);
router.post("/login", loginOrganization);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);


module.exports = router;
    