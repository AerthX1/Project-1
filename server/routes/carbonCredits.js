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
      isActive: true,
      isArchived: false,
      remainingTons: parseFloat(data.tons) || 0
    });

    await credit.save();
    res.status(201).json({ message: 'Carbon Credit Created', data: credit });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { status } = req.query; 
    let query = { retired: { $ne: true } };

    if (status === "active") query.isActive = true;
    else if (status === "inactive") query.isActive = false;

    const credits = await CarbonCredit.find(query).sort({ createdAt: -1 });
    res.status(200).json(credits);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch credits', error: err.message });
  }
});


router.get('/total-tons', async (req, res) => {
  try {
    const result = await CarbonCredit.aggregate([
      {
        $match: {
          retired: { $ne: true },
          isActive: true,
          isArchived: false
        }
      },
      {
        $group: {
          _id: null,
          remainingTons: {
            $sum: { $ifNull: ["$remainingTons", "$tons"] }
          }
        }
      }
    ]);

    const remainingTons = result[0]?.remainingTons || 0;
    res.json({ remainingTons });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch remaining tons", error: err.message });
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

    const updateData = {
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
      isActive: true,
      isArchived: false
    };

    if (data.tons) {
      updateData.remainingTons = parseFloat(data.tons);
    }

    const updatedCredit = await CarbonCredit.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "Carbon Credit Updated", data: updatedCredit });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;
