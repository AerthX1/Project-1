const express = require("express");
const router = express.Router();
const {
  registerIndividual,
  loginIndividual,
} = require("../controllers/individualAuthController");

router.post("/register", registerIndividual);
router.post("/login", loginIndividual);

module.exports = router;
