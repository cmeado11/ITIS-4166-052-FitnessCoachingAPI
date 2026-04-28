import express from 'express';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

import {
  validateCreateDiary,
  validateDiaryId,
} from '../middleware/diaryValidators.js';

import {
  createDiaryHandler,
  getDiariesHandler,
  getDiaryByIdHandler,
  updateDiaryHandler,
  deleteDiaryHandler,
} from '../controllers/diaryController.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorizeRoles('client'),
  validateCreateDiary,
  createDiaryHandler,
);

router.get('/', authenticate, getDiariesHandler);

router.get(
  '/:id',
  authenticate,
  validateDiaryId,
  getDiaryByIdHandler,
);

router.put(
  '/:id',
  authenticate,
  authorizeRoles('client'),
  validateDiaryId,
  validateCreateDiary,
  updateDiaryHandler,
);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles('client'),
  validateDiaryId,
  deleteDiaryHandler,
);

export default router;