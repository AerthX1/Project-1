const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerOrganization = async (req, res) => {
  try {
    const {
      orgName,
      orgType,
      industry,
      website,
      phone,
      country,
      state,
      city,
      fullName,
      email,
      password,
      designation,
      termsAgreed,
    } = req.body;

    if (
      !orgName || !orgType || !industry || !website || !phone ||
      !country || !state || !city || !fullName || !email ||
      !password || !designation
    ) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    if (!termsAgreed) {
      return res.status(400).json({ message: "You must agree to the terms." });
    }

    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newOrg = new Organization({
      orgName,
      orgType,
      industry,
      website,
      phone,
      country,
      state,
      city,
      fullName,
      email,
      password: hashedPassword,
      designation,
      termsAgreed,
    });

    await newOrg.save();

    const token = jwt.sign(
      { id: newOrg._id, email: newOrg.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Organization registered successfully.",
      token,
      org: {
        id: newOrg._id,
        orgName: newOrg.orgName,
        email: newOrg.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { registerOrganization };
