
const jwt = require("jsonwebtoken");
const Individual = require("../models/Individual");

const verifyIndividualToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.individual = await Individual.findById(decoded.id).select("-password");
    if (!req.individual) {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyIndividualToken;
