const express = require('express');
const router = express.Router();
const CarbonCredit = require('../models/CarbonCredit');
const multer = require('multer');
const path = require('path');
const Individual = require('../models/Individual');
const Organization = require('../models/Organization');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'image' }, { name: 'backgroundImage' }]), async (req, res) => {

  try {
    const data = req.body;
    const imagePath = req.files?.image?.[0] ? `/uploads/${req.files.image[0].filename}` : data.imageUrl || '';
const backgroundImagePath = req.files?.backgroundImage?.[0]
  ? `/uploads/${req.files.backgroundImage[0].filename}`
  : '';
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const data = req.body;
     const imagePath = req.files?.image?.[0]
      ? `/uploads/${req.files.image[0].filename}`
      : data.imageUrl || '';

    const backgroundImagePath = req.files?.backgroundImage?.[0]
      ? `/uploads/${req.files.backgroundImage[0].filename}`
      : data.backgroundImageUrl || '';

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
      backgroundImage: backgroundImagePath,
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


router.get('/total-tons', async (req, res) => {
  try {
    const result = await CarbonCredit.aggregate([
      {
        $match: {
          retired: { $ne: true }, 
          tons: { $type: "number" } 
        }
      },
      {
        $group: {
          _id: null,
          totalTons: { $sum: "$tons" }
        }
      }
    ]);

    const totalTons = result[0]?.totalTons || 0;
    res.json({ totalTons });
  } catch (err) {
    console.error("❌ Error in /carbon-credits/total-tons:", err.message);
    res.status(500).json({ message: "Failed to fetch total tons", error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CarbonCredit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

router.put('/:id', upload.fields([{ name: 'image' }, { name: 'backgroundImage' }]), async (req, res) => {

  try {
    const data = req.body;
  const imagePath = req.files?.image?.[0] ? `/uploads/${req.files.image[0].filename}` : data.imageUrl || '';
const backgroundImagePath = req.files?.backgroundImage?.[0]
  ? `/uploads/${req.files.backgroundImage[0].filename}`
  : '';
router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const data = req.body;
        const imagePath = req.files?.image?.[0]
      ? `/uploads/${req.files.image[0].filename}`
      : data.imageUrl || '';

    const backgroundImagePath = req.files?.backgroundImage?.[0]
      ? `/uploads/${req.files.backgroundImage[0].filename}`
      : data.backgroundImageUrl || '';

    const updatedCredit = await CarbonCredit.findByIdAndUpdate(
      req.params.id,
      {
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
        backgroundImage: backgroundImagePath,
      },
      { new: true }
    );

    res.json({ message: "Carbon Credit Updated", data: updatedCredit });
  } catch (err) {
    console.error("❌ Update Error:", err.message);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});




module.exports = router;
