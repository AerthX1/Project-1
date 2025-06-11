const Organization = require("../models/Organization");

const getProfile = async (req, res) => {
  try {
    const org = await Organization.findById(req.org._id).select("-password");
    if (!org) return res.status(404).json({ error: "Organization not found" });
    res.json(org);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedOrg = await Organization.findByIdAndUpdate(
      req.org._id,
      { ...updates },
      { new: true }
    ).select("-password");
    res.json(updatedOrg);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

module.exports = { getProfile, updateProfile };
