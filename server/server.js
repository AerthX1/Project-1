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

const app = express();
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/organization", orgRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/individual", individualRoutes);
app.use("/api/individual", individualProfileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
