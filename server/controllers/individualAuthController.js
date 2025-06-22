const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Individual = require("../models/Individual");

const registerIndividual = async (req, res) => {
  try {
   const { fullName, email, password, country, city, state, phone, designation, description } = req.body;

if (!fullName || !email || !password || !country || !city) {
  return res.status(400).json({ message: "All required fields must be filled." });
}

const existingUser = await Individual.findOne({ email });
if (existingUser) {
  return res.status(400).json({ message: "Email already registered." });
}

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new Individual({
  fullName,
  email,
  password: hashedPassword,
  country,
  city,
  state: state || "",
  phone: phone || "",
  designation: designation || "",
  description: description || "",
  avatarUrl: "", 
});

await newUser.save();


    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Individual registered successfully.",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Individual Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const loginIndividual = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await Individual.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: "individual"
      },
    });
  } catch (error) {
    console.error("Login Individual Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  registerIndividual,
  loginIndividual,
};
