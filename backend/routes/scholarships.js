const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/scholarships
// @desc    Get all scholarships
// @access  Public
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ isActive: true })
      .populate('provider', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: scholarships.length,
      scholarships
    });
  } catch (error) {
    console.error('Get scholarships error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/scholarships/:id
// @desc    Get single scholarship
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id)
      .populate('provider', 'name email');

    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found'
      });
    }

    res.json({
      success: true,
      scholarship
    });
  } catch (error) {
    console.error('Get scholarship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/scholarships
// @desc    Create scholarship
// @access  Private (Provider/Admin only)
router.post('/', protect, authorize('provider', 'admin'), async (req, res) => {
  try {
    const scholarship = await Scholarship.create({
      ...req.body,
      provider: req.user.id
    });

    res.status(201).json({
      success: true,
      scholarship
    });
  } catch (error) {
    console.error('Create scholarship error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;