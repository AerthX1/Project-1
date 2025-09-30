const mongoose = require("mongoose");

const individualSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  phone: { type: String },
  designation: { type: String },
  about: { type: String, default: '' },
  description: { type: String },
  avatarUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Individual", individualSchema);
