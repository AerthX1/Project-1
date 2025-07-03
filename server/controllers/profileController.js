const Organization = require("../models/Organization");

const getProfile = async (req, res) => {
  try {
    const org = await Organization.findById(req.user.id).select("-password");
    if (!org) return res.status(404).json({ error: "Organization not found" });
    res.json(org);
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.body) {
      return res.status(400).json({ message: "No form data received" });
    }

    const updatedData = {};
    const allowedFields = [
      "orgName", "orgType", "industry", "website", "phone", "fullName", 
      "country", "state", "city", "description","designation"
    ];

    allowedFields.forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        updatedData[key] = req.body[key];
      }
    });

    if (req.file) {
      updatedData.avatarUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProfile = await Organization.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "No such organization to update" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
