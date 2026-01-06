const { body, validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

exports.registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').trim().notEmpty().isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be 8+ characters'),
  body('phone').trim().notEmpty().matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone required'),
  body('role').notEmpty().isIn(['student', 'institution', 'provider']).withMessage('Invalid role')
];

exports.loginValidation = [
  body('email').trim().notEmpty().isEmail().normalizeEmail(),
  body('password').notEmpty()
];