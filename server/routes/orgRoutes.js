const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { registerOrganization } = require("../controllers/orgAuthController");
const { loginOrganization, sendOtp, resetPassword } = require("../controllers/authController");
const { getProfile, updateProfile } = require("../controllers/profileController");
const { sendRegisterOtp, verifyRegisterOtp } = require("../controllers/otpController");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads/";
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    try {
      const orgName = req.user?.orgName?.replace(/\s+/g, "_") || req.user?.id || "unknown";
      const ext = path.extname(file.originalname);
      const filename = `${orgName}_${Date.now()}${ext}`;
      cb(null, filename);
    } catch (err) {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  },
});

const upload = multer({ storage });

router.post("/register", registerOrganization);
router.post("/login", loginOrganization);
router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, upload.single("avatar"), updateProfile);

router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);
router.post("/verify-otp", verifyRegisterOtp);
router.post("/send-register-otp", sendRegisterOtp);

module.exports = router;
