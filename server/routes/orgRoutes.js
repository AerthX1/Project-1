const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { registerOrganization } = require('../controllers/orgAuthController');
const { loginOrganization } = require("../controllers/authController");

router.post('/register', registerOrganization);
router.post("/login", loginOrganization);

router.get('/profile', verifyToken, (req, res) => {
  res.json({
    fullName: req.org.fullName,
    email: req.org.email,
    orgName: req.org.orgName,
  });
});

module.exports = router;
