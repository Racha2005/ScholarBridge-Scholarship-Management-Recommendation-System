const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scholarshipName: {
    type: String,
    required: true
  },
  sslc: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  puc: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  ugDegree: String,
  ugMarks: String,
  pgDegree: String,
  pgMarks: String,
  currentCourse: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
    default: 'Under Review'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);