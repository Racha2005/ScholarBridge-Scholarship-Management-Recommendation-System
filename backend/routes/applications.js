const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect } = require('../middleware/auth');

// @route   POST /api/applications
// @desc    Submit scholarship application
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { 
      scholarshipName, 
      sslc, 
      puc, 
      ugDegree, 
      ugMarks, 
      pgDegree, 
      pgMarks, 
      currentCourse, 
      reason 
    } = req.body;

    const application = await Application.create({
      user: req.user.id,
      scholarshipName,
      sslc,
      puc,
      ugDegree,
      ugMarks,
      pgDegree,
      pgMarks,
      currentCourse,
      reason
    });

    console.log('✅ Application submitted:', scholarshipName, 'by user:', req.user.email);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application
    });
  } catch (error) {
    console.error('❌ Application submission error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting application'
    });
  }
});

// @route   GET /api/applications
// @desc    Get user's applications
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error('❌ Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications'
    });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Make sure user owns this application
    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this application'
      });
    }

    res.json({
      success: true,
      application
    });
  } catch (error) {
    console.error('❌ Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching application'
    });
  }
});

module.exports = router;