// validationMiddleware.js      this need to be integrated
const { body, validationResult } = require('express-validator');


const validateRequest = [
    body('name').notEmpty().withMessage('Name is required'),
    body('employee_id').notEmpty().withMessage('Employee ID is required'),
    body('cnic').notEmpty().withMessage('CNIC is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRequest;