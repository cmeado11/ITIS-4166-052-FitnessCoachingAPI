import {
  createDiary,
  findDiariesByClientId,
  findDiariesByCoachId,
  findDiaryById,
  updateDiary,
  deleteDiary,
} from '../repositories/diaryRepo.js';

import { findProgramById } from '../repositories/programRepo.js';

export async function createDiaryService(data, user) {
  const program = await findProgramById(data.program_id);

  if (!program) {
    const err = new Error('Program not found');
    err.status = 404;
    throw err;
  }

  if (program.client_id !== user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  return createDiary({
    ...data,
    entry_date: new Date(data.entry_date),
    client_id: user.id,
  });
}

export async function getDiariesService(user) {
  if (user.role === 'coach') {
    return findDiariesByCoachId(user.id);
  }

  return findDiariesByClientId(user.id);
}

export async function getDiaryByIdService(id, user) {
  const diary = await findDiaryById(id);

  if (!diary) {
    const err = new Error('Diary entry not found');
    err.status = 404;
    throw err;
  }

  const authorized =
    (user.role === 'client' &&
      diary.client_id === user.id) ||
    (user.role === 'coach' &&
      diary.program.coach_id === user.id);

  if (!authorized) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  return diary;
}

export async function updateDiaryService(id, data, user) {
  const diary = await findDiaryById(id);

  if (!diary) {
    const err = new Error('Diary entry not found');
    err.status = 404;
    throw err;
  }

  if (diary.client_id !== user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  return updateDiary(id, {
    ...data,
    entry_date: new Date(data.entry_date),
  });
}

export async function deleteDiaryService(id, user) {
  const diary = await findDiaryById(id);

  if (!diary) {
    const err = new Error('Diary entry not found');
    err.status = 404;
    throw err;
  }

  if (diary.client_id !== user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  await deleteDiary(id);
}