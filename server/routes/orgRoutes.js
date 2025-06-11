const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { registerOrganization } = require('../controllers/orgAuthController');
const { loginOrganization } = require("../controllers/authController");
const { getProfile, updateProfile } = require('../controllers/profileController');

router.post('/register', registerOrganization);
router.post("/login", loginOrganization);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
