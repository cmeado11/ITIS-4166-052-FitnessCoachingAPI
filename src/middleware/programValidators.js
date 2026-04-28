import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCreateProgram = [
  body('client_id')
    .isInt({ min: 1 })
    .withMessage('Client ID must be a positive integer'),

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('goal')
    .trim()
    .notEmpty()
    .withMessage('Goal is required'),

  body('duration_weeks')
    .isInt({ min: 1 })
    .withMessage('Duration weeks must be a positive integer'),

  body('status')
    .optional()
    .isString()
    .withMessage('Status must be a string'),

  handleValidationErrors,
];

export const validateProgramId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),

  handleValidationErrors,
];