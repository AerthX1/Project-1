const mongoose = require('mongoose');

const CarbonCreditSchema = new mongoose.Schema({
  image: { type: String },
  backgroundImage: { type: String },
  title: { type: String, required: true },
  name: { type: String, required: true },
  verifiedBy: { type: String },
  category: { type: String },
  projectType: { type: String },
  projectDeveloper: { type: String },
  methodology: { type: String },
  projectDuration: { type: String },
  tons: { type: Number },
  pricePerTon: { type: Number },
  totalPrice: { type: Number },
  info: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  placeName: { type: String },
  vintage: { type: String },
  vintageYear: { type: String },
  retired: { type: Boolean, default: false },
  sdgs: { type: [String] },
  registryLink: { type: String },
  additionalNotes: { type: String },
  isActive: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  remainingTons: { type: Number, default: function() { return this.tons || 0; } },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CarbonCredit', CarbonCreditSchema);
