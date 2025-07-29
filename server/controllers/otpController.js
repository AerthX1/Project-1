const RegisterOtp = require("../models/RegisterOtp");
const Individual = require("../models/Individual");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Notification = require("../models/Notification"); 

exports.sendRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const existingIndividual = await Individual.findOne({ email });
    const existingOrganization = await Organization.findOne({ email });
    if (existingIndividual || existingOrganization) {
      return res.status(400).json({ message: "Email is already registered. Please sign in." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 
    await RegisterOtp.deleteMany({ email });
    await RegisterOtp.create({
      email,
      otp,
      createdAt: new Date(),
      expiresAt: expiresAt,
    });

    await sendEmail({
      to: email,
      subject: "Your Aearthex Registration OTP",
      text: `Your OTP for Aearthex registration is ${otp}. It is valid for 5 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("OTP Send Error:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

exports.verifyRegisterOtp = async (req, res) => {
  try {
    const { email, otp, form, userType } = req.body;

    if (!email || !otp || !form || !userType) {
      return res.status(400).json({ message: "All required fields (email, OTP, form data, user type) must be provided." });
    }

    const otpDoc = await RegisterOtp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({ message: "No OTP found for this email. Please request a new one." });
    }

    if (new Date() > otpDoc.expiresAt) {
      await RegisterOtp.deleteOne({ _id: otpDoc._id }); 
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    await RegisterOtp.deleteOne({ _id: otpDoc._id });

    const existingIndividual = await Individual.findOne({ email });
    const existingOrganization = await Organization.findOne({ email });
    if (existingIndividual || existingOrganization) {
      return res.status(400).json({ message: "This email is already registered. Please sign in." });
    }

    const hashedPassword = await bcrypt.hash(form.password, 10);
    let newUser;
    let registeredUserType;

    if (userType.toLowerCase() === "organization") {
      newUser = await Organization.create({
        ...form,
        password: hashedPassword,
      });
      registeredUserType = "Organization";
    } else if (userType.toLowerCase() === "individual") {
      newUser = await Individual.create({
        ...form,
        password: hashedPassword,
      });
      registeredUserType = "Individual";
    } else {
      return res.status(400).json({ message: "Invalid user type provided for registration." });
    }

    await sendEmail({
      to: newUser.email,
      subject: "Welcome to Aearthex 🌍",
      text: `Hello ${newUser.fullName || newUser.orgName}, welcome to Aearthex! Your registration is successful.`,
      html: `<h2>Welcome to Aearthex, ${newUser.fullName || newUser.orgName}!</h2>
             <p>Your account has been successfully created.</p>
             <p>Thank you for joining our mission toward a greener future. 🌿</p>`,
    });

    await Notification.create({
      userId: newUser._id,
      userType: registeredUserType,
      title: "Welcome to Aearthex!",
      message: `Your ${registeredUserType.toLowerCase()} account was successfully created.`,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, userType: registeredUserType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ 
      message: "Registration complete. Welcome to Aearthex!",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName || newUser.orgName, 
        userType: registeredUserType
      },
    });

  } catch (error) {
    console.error("Verify OTP & Registration Error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: `Validation Error: ${error.message}` });
    }
    res.status(500).json({ message: "Registration failed. Server error." });
  }
};