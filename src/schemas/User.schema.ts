import Joi from "joi";

export const UserRegisterSchema = Joi.object({
    fullname: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'Full name is required.',
        'string.min': 'Full name must be at least 2 characters long.',
        'string.max': 'Full name cannot exceed 100 characters.',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
    }),
    mobile: Joi.string()
        .min(10)
        .max(15)
        .pattern(/^\+?[\d\s\-\(\)]+$/) 
        .optional()
        .allow('')
        .messages({
            'string.min': 'Mobile number must be at least 10 characters long.',
            'string.max': 'Mobile number cannot exceed 15 characters.',
            'string.pattern.base': 'Mobile number format is invalid. Only digits, spaces, dashes, parentheses, and + are allowed.',
        }),
});
