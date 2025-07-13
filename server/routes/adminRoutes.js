const express = require("express");
const router = express.Router();
const Individual = require("../models/Individual");
const Organization = require("../models/Organization");

router.get("/individuals", async (req, res) => {
  try {
    const individuals = await Individual.find();
    res.status(200).json(individuals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching individuals" });
  }
});

router.get("/organizations", async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching organizations" });
  }
});

router.delete('/individuals/:id', async (req, res) => {
  try {
    await Individual.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete individual" });
  }
});

router.delete('/organizations/:id', async (req, res) => {
  try {
    await Organization.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete organization" });
  }
});


module.exports = router;
