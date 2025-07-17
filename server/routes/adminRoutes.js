const express = require('express');
const router = express.Router();
const Individual = require('../models/Individual');
const Organization = require('../models/Organization');

// Get all individuals
router.get('/individuals', async (req, res) => {
  try {
    const individuals = await Individual.find();
    res.status(200).json(individuals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch individuals', error: err.message });
  }
});

// Delete individual by ID
router.delete('/individuals/:id', async (req, res) => {
  try {
    const deleted = await Individual.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Individual not found' });
    res.status(200).json({ message: 'Individual deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete individual', error: err.message });
  }
});

// Get all organizations
router.get('/organizations', async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch organizations', error: err.message });
  }
});

// Delete organization by ID
router.delete('/organizations/:id', async (req, res) => {
  try {
    const deleted = await Organization.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Organization not found' });
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete organization', error: err.message });
  }
});

module.exports = router;
