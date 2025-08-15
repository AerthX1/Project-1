const jwt = require("jsonwebtoken");
const Individual = require("../models/Individual");
const Organization = require("../models/Organization");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let userType = decoded.userType || "Individual";
    req.user = { id: decoded.id, userType };

    if (userType === "Individual") {
      const user = await Individual.findById(decoded.id);
      if (user) req.user.fullName = user.fullName;
    } else if (userType === "Organization") {
      const user = await Organization.findById(decoded.id);
      if (user) req.user.orgName = user.orgName;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
