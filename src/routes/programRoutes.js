import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
  validateCreateProgram,
  validateProgramId,
} from '../middleware/programValidators.js';
import {
  createProgramHandler,
  getProgramsHandler,
  getProgramByIdHandler,
  updateProgramHandler,
  deleteProgramHandler,
} from '../controllers/programController.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorizeRoles('coach'),
  validateCreateProgram,
  createProgramHandler,
);

router.get('/', authenticate, getProgramsHandler);

router.get(
  '/:id',
  authenticate,
  validateProgramId,
  getProgramByIdHandler,
);

router.put(
  '/:id',
  authenticate,
  authorizeRoles('coach'),
  validateProgramId,
  validateCreateProgram,
  updateProgramHandler,
);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles('coach'),
  validateProgramId,
  deleteProgramHandler,
);

export default router;