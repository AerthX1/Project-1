const mongoose = require("mongoose");

const bugReportSchema = new mongoose.Schema(
  {
    title: { type: [String], required: true },
    description: { type: String, required: true },
    reporterName: { type: String, required: true },
    userType: {
      type: String,
      enum: ["Individual", "Organization"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BugReport", bugReportSchema);