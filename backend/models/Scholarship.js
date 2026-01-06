const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide scholarship name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide scholarship amount']
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['Merit-Based', 'Need-Based', 'Women', 'Minority', 'Sports', 'Rural', 'Technical', 'Arts', 'Medical', 'Research', 'Management', 'Law']
  },
  eligibility: {
    minimumPercentage: Number,
    courseLevel: String,
    course: String,
    maxFamilyIncome: Number,
    gender: String,
    category: [String]
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalSlots: {
    type: Number,
    required: true
  },
  slotsAvailable: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Suspended'],
    default: 'Open'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);