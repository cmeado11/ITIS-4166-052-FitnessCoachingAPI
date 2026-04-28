import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
  validateCreateWorkoutLog,
  validateWorkoutLogId,
} from '../middleware/workoutLogValidators.js';
import {
  createWorkoutLogHandler,
  getWorkoutLogsHandler,
  getWorkoutLogByIdHandler,
  updateWorkoutLogHandler,
  deleteWorkoutLogHandler,
} from '../controllers/workoutLogController.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorizeRoles('client'),
  validateCreateWorkoutLog,
  createWorkoutLogHandler,
);

router.get('/', authenticate, getWorkoutLogsHandler);

router.get(
  '/:id',
  authenticate,
  validateWorkoutLogId,
  getWorkoutLogByIdHandler,
);

router.put(
  '/:id',
  authenticate,
  authorizeRoles('client'),
  validateWorkoutLogId,
  validateCreateWorkoutLog,
  updateWorkoutLogHandler,
);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles('client'),
  validateWorkoutLogId,
  deleteWorkoutLogHandler,
);

export default router;