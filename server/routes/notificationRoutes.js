const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

const verifyIndividual = require("../middleware/individualAuthMiddleware");
const verifyOrganization = require("../middleware/authMiddleware");

router.get("/individual", verifyIndividual, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.individual._id,
      userType: "Individual",
    }).sort({ timestamp: -1 });

    res.json({ notifications });
  } catch (error) {
    console.error("Fetch Individual Notifications Error:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

router.get("/organization", verifyOrganization, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
      userType: "Organization",
    }).sort({ timestamp: -1 });

    res.json({ notifications });
  } catch (error) {
    console.error("Fetch Organization Notifications Error:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

module.exports = router;
