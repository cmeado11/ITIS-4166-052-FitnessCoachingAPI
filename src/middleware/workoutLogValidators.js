import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateCreateWorkoutLog = [
  body('program_id')
    .isInt({ min: 1 })
    .withMessage('Program ID must be a positive integer'),

  body('workout_date')
    .isISO8601()
    .withMessage('Workout date must be a valid date'),

  body('exercise_name')
    .trim()
    .notEmpty()
    .withMessage('Exercise name is required'),

  body('prescribed_sets')
    .isInt({ min: 1 })
    .withMessage('Prescribed sets must be a positive integer'),

  body('prescribed_reps')
    .isInt({ min: 1 })
    .withMessage('Prescribed reps must be a positive integer'),

  body('actual_sets')
    .isInt({ min: 1 })
    .withMessage('Actual sets must be a positive integer'),

  body('actual_reps')
    .isInt({ min: 1 })
    .withMessage('Actual reps must be a positive integer'),

  body('load')
    .isFloat({ min: 0 })
    .withMessage('Load must be a positive number'),

  body('rpe')
    .isInt({ min: 1, max: 10 })
    .withMessage('RPE must be between 1 and 10'),

  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string'),

  handleValidationErrors,
];

export const validateWorkoutLogId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),

  handleValidationErrors,
];