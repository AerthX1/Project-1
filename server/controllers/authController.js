const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }

    const org = await Organization.findOne({ email });
    if (!org) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: org._id, email: org.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

 res.status(200).json({
  message: "Login successful",
  token,
  org: {
    id: org._id,
    orgName: org.orgName,
    email: org.email,
    role: org.role, 
    avatarUrl: org.avatarUrl,
  },
});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }

  
};

module.exports = { loginOrganization };