const mongoose = require("mongoose");

const otpTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
    purpose: { type: String, enum: ["reset_password", "registration"], required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } 
});

module.exports = mongoose.model("OtpToken", otpTokenSchema);
