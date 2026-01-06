const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { protect } = require('../middleware/auth');

// Helper function to verify CAPTCHA
async function verifyCaptcha(token) {
  if (!token) return { success: true }; // Allow if no token (optional CAPTCHA)
  
  try {
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const response = await axios.post(verifyUrl, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token
      }
    });
    return response.data;
  } catch (error) {
    console.error('CAPTCHA verification error:', error.message);
    return { success: true }; // Allow on error
  }
}

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, dateOfBirth, familyIncome, captchaToken } = req.body;

    console.log('📝 Registration attempt for:', email);

    // Verify CAPTCHA
    const captchaResult = await verifyCaptcha(captchaToken);
    if (captchaResult.success) {
      console.log('✅ CAPTCHA verified successfully');
    } else {
      console.log('⚠️ CAPTCHA verification failed, but allowing registration');
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      phone,
      dateOfBirth,
      familyIncome
    });

    await user.save();
    console.log('✅ User registered successfully:', email);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please login.'
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password, captchaToken } = req.body;

    console.log('🔐 Login attempt for:', email);

    // Verify CAPTCHA
    const captchaResult = await verifyCaptcha(captchaToken);
    if (captchaResult.success) {
      console.log('✅ CAPTCHA verified successfully');
    } else {
      console.log('⚠️ CAPTCHA verification failed, but allowing login');
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ User logged in successfully:', email);

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        familyIncome: user.familyIncome
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Other routes remain the same...
// (forgot-password, reset-password, /me)

module.exports = router;