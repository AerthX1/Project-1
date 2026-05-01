const express = require("express");
const router = express.Router();

const {
  getIndividualPricing,
  updateIndividualPricing,
  deleteIndividualPricing,
  resetIndividualPricing,
} = require("../controllers/individualPricingController");

router.get("/", getIndividualPricing);
router.post("/", updateIndividualPricing);
router.delete("/", deleteIndividualPricing);
router.post("/reset", resetIndividualPricing);

module.exports = router;