require("dotenv").config();
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profileRoutes");

const authRoutes = require("./routes/authRoutes");
const orgRoutes = require("./routes/orgRoutes");
const individualRoutes = require("./routes/individualRoutes");
const individualProfileRoutes = require("./routes/individualProfileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const carbonCreditRoutes = require('./routes/carbonCredits');
const adminRoutes = require('./routes/adminRoutes'); 
const bugRoutes = require("./routes/bugRoutes.js");
const contactRoutes = require("./routes/contactRoutes");
const faqRoutes = require("./routes/faqRoutes");

const path = require('path');
const app = express();
const allowedOrigins = [
  process.env.VITE_MAIN_URL,
  process.env.VITE_CLIENT_URL,
  process.env.VITE_ADMIN_URL
];
dotenv.config();

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} body:`, req.body);
  next();
});
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/api/organization", orgRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/individual", individualRoutes);
app.use("/api/individual", individualProfileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", bugRoutes);
app.use("/api/user/notifications", notificationRoutes);
app.use("/api/faqs", faqRoutes);
app.use('/api/carbon-credits', carbonCreditRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;  
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}        `));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
