import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCreateDiary = [
  body('program_id')
    .isInt({ min: 1 })
    .withMessage('Program ID must be a positive integer'),

  body('entry_date')
    .isISO8601()
    .withMessage('Entry date must be a valid date'),

  body('mood')
    .trim()
    .notEmpty()
    .withMessage('Mood is required'),

  body('energy_level')
    .isInt({ min: 1, max: 10 })
    .withMessage('Energy level must be between 1 and 10'),

  body('soreness_level')
    .isInt({ min: 1, max: 10 })
    .withMessage('Soreness level must be between 1 and 10'),

  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required'),

  handleValidationErrors,
];

export const validateDiaryId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),

  handleValidationErrors,
];