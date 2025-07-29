const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const OtpToken = require("../models/OtpToken");
const Individual = require("../models/Individual");
const Organization = require("../models/Organization");
const Notification = require("../models/Notification");

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
      { expiresIn: "30d" }
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user =
      (await Individual.findOne({ email })) ||
      (await Organization.findOne({ email }));

    if (!user) return res.status(404).json({ error: "Email not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpToken.deleteMany({ email });
    await OtpToken.create({ email, otp });

    await transporter.sendMail({
      from: `"Aearthex" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP for Password Reset",
      html: `<p>Your Aearthex OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const otpDoc = await OtpToken.findOne({ email });
 if (!otpDoc || otpDoc.otp !== otp) return res.status(400).json({ error: "OTP expired or invalid" });

    const hashed = await bcrypt.hash(password, 10);

    const userModel = await Individual.findOne({ email }) ? Individual : Organization;
    const user = await userModel.findOneAndUpdate(
      { email },
      { password: hashed },
      { new: true }
    );

    await OtpToken.deleteMany({ email });

    await transporter.sendMail({
      from: `"Aearthex" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Aearthex Password Was Changed",
      html: `<h2>Password Changed</h2>
             <p>Hi ${user.fullName || "User"},</p>
             <p>Your Aearthex account password has been successfully updated.</p>
             <p>If this wasn't you, please contact our support immediately.</p>`,
    });

    await Notification.create({
      userId: user._id,
      userType: userModel === Individual ? "Individual" : "Organization",
      title: "Password Changed Successfully",
    message: `Hi ${user.fullName}, your Aearthex account password was changed successfully. If this wasn't you, please contact support immediately.`,
    });

    console.log("✅ Password change email sent to:", email);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Password reset error:", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
};



module.exports = {
  loginOrganization,
  sendOtp,
  resetPassword,
};
