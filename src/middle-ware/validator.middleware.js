import { body, validationResult } from 'express-validator';

export const validateConsultation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('email').trim().isEmail().withMessage('Valid email required'),
    body('siteType').trim().notEmpty().withMessage('Site type is required'), // Changed from service
    body('details').trim().notEmpty().withMessage('Details are required'),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};