const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  orgType: { type: String, required: true },
  industry: { type: String, required: true },
  website: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: { type: String, required: true },
  termsAgreed: { type: Boolean, required: true, default: false },
  avatarUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  twitter: { type: String, default: '' },
  isOpenToPartnerships: { type: Boolean, default: false },
  showOnMarketplace: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Organization", organizationSchema);

