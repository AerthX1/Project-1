const express = require('express');
const router = express.Router();
const CarbonCredit = require('../models/CarbonCredit');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : data.imageUrl || '';


    const credit = new CarbonCredit({
      title: data.title || '',
      name: data.name || '',
      verifiedBy: data.verifiedBy || '',
      category: data.category || '',
      projectType: data.projectType || '',
      projectDeveloper: data.projectDeveloper || '',
      methodology: data.methodology || '',
      projectDuration: data.projectDuration || '',
      tons: parseFloat(data.tons) || 0,
      pricePerTon: parseFloat(data.pricePerTon) || 0,
      totalPrice: (parseFloat(data.pricePerTon) || 0) * (parseFloat(data.tons) || 0),
      info: data.info || '',
      country: data.country || '',
      state: data.state || '',
      city: data.city || '',
      placeName: data.placeName || '',
      vintage: data.vintage || '',
      vintageYear: data.vintageYear || '',
      retired: data.retired === 'true' || data.retired === true,
      sdgs: typeof data.sdgs === 'string' ? data.sdgs.split(',').map(s => s.trim()) : [],
      registryLink: data.registryLink || '',
      additionalNotes: data.additionalNotes || '',
      image: imagePath,
    });

    await credit.save();
    res.status(201).json({ message: 'Carbon Credit Created', data: credit });

  } catch (err) {
    console.error("❌ Server Error in POST /carbon-credits:", err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});


router.get('/', async (req, res) => {

  try {
    const credits = await CarbonCredit.find().sort({ createdAt: -1 });
    
    res.status(200).json(credits);
  } catch (err) {
    console.error("❌ Server Error in GET /carbon-credits:", err.message);
    res.status(500).json({ message: 'Failed to fetch credits', error: err.message });
  }
});

module.exports = router;
