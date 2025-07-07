const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getIndividualProfile,
  updateIndividualProfile,
} = require("../controllers/individualProfileController");

const verifyIndividualToken = require("../middleware/individualAuthMiddleware");

const uploadDir = "uploads/";
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    try {
      const userName = req.user?.fullName?.replace(/\s+/g, "_") || req.user?.id || "unknown";

      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; 
      const istTime = new Date(now.getTime() + istOffset);

      const year = istTime.getFullYear();
      const month = String(istTime.getMonth() + 1).padStart(2, "0");
      const day = String(istTime.getDate()).padStart(2, "0");
      const hours = String(istTime.getHours()).padStart(2, "0");
      const minutes = String(istTime.getMinutes()).padStart(2, "0");
      const seconds = String(istTime.getSeconds()).padStart(2, "0");

      const timeStampIST = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
      const ext = path.extname(file.originalname);
      const filename = `${userName}_${timeStampIST}${ext}`;
      cb(null, filename);
    } catch (err) {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  },
});

const upload = multer({ storage });

router.get("/profile", verifyIndividualToken, getIndividualProfile);
router.put("/profile", verifyIndividualToken, upload.single("avatar"), updateIndividualProfile);

module.exports = router;
