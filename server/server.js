require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

const orgSchema = new mongoose.Schema({
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
  termsAgreed: { type: Boolean, required: true },
}, { timestamps: true });

const Organization = mongoose.model('Organization', orgSchema);

app.post('/api/org/register', async (req, res) => {
  try {
    const {
      orgName, orgType, industry, website, phone,
      country, state, city, fullName, email,
      password, designation, termsAgreed,
    } = req.body;

    if (!termsAgreed) {
      return res.status(400).json({ message: 'You must agree to the terms' });
    }

    const existing = await Organization.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newOrg = new Organization({
      orgName,
      orgType,
      industry,
      website,
      phone,
      country,
      state,
      city,
      fullName,
      email,
      password: hashedPassword,
      designation,
      termsAgreed,
    });

    await newOrg.save();

    const token = jwt.sign(
      { id: newOrg._id, email: newOrg.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Organization registered successfully',
      token,
      org: {
        id: newOrg._id,
        orgName: newOrg.orgName,
        email: newOrg.email,
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
