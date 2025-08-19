const express = require('express');
const router = express.Router();
const Individual = require('../models/Individual');
const Organization = require('../models/Organization');
const BugReport = require('../models/BugReport');
const nodemailer = require("nodemailer");
const Notification = require("../models/Notification");


router.get('/individuals', async (req, res) => {
  try {
    const individuals = await Individual.find();
    res.status(200).json(individuals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch individuals', error: err.message });
  }
});

router.delete('/individuals/:id', async (req, res) => {
  try {
    const deleted = await Individual.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Individual not found' });
    res.status(200).json({ message: 'Individual deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete individual', error: err.message });
  }
});

router.get('/organizations', async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch organizations', error: err.message });
  }
});

router.delete('/organizations/:id', async (req, res) => {
  try {
    const deleted = await Organization.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Organization not found' });
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete organization', error: err.message });
  }
});

router.get('/users-reports', async (req, res) => {
  try {
    const individuals = await Individual.find();
    const organizations = await Organization.find();

    const allUsers = [...individuals, ...organizations];

    const usersWithReports = await Promise.all(
      allUsers.map(async (user) => {
        const reportsCount = await BugReport.countDocuments({ userId: user._id });
        const newReports = await BugReport.countDocuments({ userId: user._id, seen: false });

        return {
          id: user._id,
          name: user.fullName || user.orgName,
          reportsCount,
          newReports,
        };
      })
    );

    res.status(200).json(usersWithReports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user reports', error: err.message });
  }
});

router.get('/user-reports/:userId', async (req, res) => {
  try {
    const reports = await BugReport.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user reports', error: err.message });
  }
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-email/:userId", async (req, res) => {
  try {
    const { subject, problem, message } = req.body;

    const user =
      (await Individual.findById(req.params.userId)) ||
      (await Organization.findById(req.params.userId));

    if (!user || !user.email) {
      return res.status(404).json({ message: "User not found or has no email" });
    }

const emailBody = `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #ffffff; width: 100%;">
    
    <!-- Header -->
    <div style="background: linear-gradient(90deg, #2e7d32, #66bb6a); padding: 20px; text-align: center; color: white;">
      <img src="https://i.ibb.co/0XxJX5Y/aerthx-logo.png" alt="AerthX Logo" style="height: 50px; margin-bottom: 10px;" />
      <h2 style="margin: 0; font-size: 22px;">AerthX Support Team</h2>
    </div>

    <!-- Body -->
    <div style="padding: 25px;">
      <h3 style="color: #2e7d32; margin-top: 0;">Hello,</h3>
      
      <p>We have received your report and here are the details:</p>
      
      <p><strong style="color:#2e7d32;">Problem Reported:</strong> ${problem || "N/A"}</p>
      
      <p><strong style="color:#4caf50;">Our Response:</strong> ${message}</p>

      <p>If you have further questions, feel free to reply to this email.</p>

      <p style="margin-top: 25px;">Best regards,<br/><strong>The AerthX Team</strong></p>
    </div>

    <!-- Footer -->
    <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
      © ${new Date().getFullYear()} AerthX. All rights reserved.<br/>
      <a href="https://aerthx.com" style="color: #2e7d32; text-decoration: none;">Visit our website</a>
    </div>

  </div>
`;



    await transporter.sendMail({
      from: `"AerthX Admin" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: subject || "Regarding Your Report - AerthX",
      text: `Problem Reported:\n${problem || "N/A"}\n\nOur Response:\n${message}`,
      html: emailBody,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
});


router.delete("/delete-report/:reportId", async (req, res) => {
  try {
    const deleted = await BugReport.findByIdAndDelete(req.params.reportId);
    if (!deleted) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete report", error: err.message });
  }
});

router.post("/send-notification/:userId", async (req, res) => {
  try {
    const { title, description } = req.body;

    const user =
      (await Individual.findById(req.params.userId)) ||
      (await Organization.findById(req.params.userId));

    if (!user) return res.status(404).json({ message: "User not found" });

    const newNotification = new Notification({
      userId: user._id,
      userType: user.fullName ? "Individual" : "Organization",
      title,
      description,
      timestamp: new Date(),
    });

    await newNotification.save();
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (err) {
    console.error("Send Notification Error:", err);
    res.status(500).json({ message: "Failed to send notification", error: err.message });
  }
});



module.exports = router;
