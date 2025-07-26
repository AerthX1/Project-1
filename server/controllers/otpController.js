const RegisterOtp = require("../models/RegisterOtp");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.sendRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await RegisterOtp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendEmail({
      to: email,
      subject: "Your Aearthex Registration OTP",
      text: `Your OTP for Aearthex registration is ${otp}. It is valid for 5 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent to email." });
  } catch (error) {
    console.error("OTP Send Error:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};