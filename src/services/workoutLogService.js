import {
  createWorkoutLog,
  findWorkoutLogsByClientId,
  findWorkoutLogsByCoachId,
  findWorkoutLogById,
  updateWorkoutLog,
  deleteWorkoutLog,
} from '../repositories/workoutLogRepo.js';

import { findProgramById } from '../repositories/programRepo.js';

export async function createWorkoutLogService(data, user) {
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

  return createWorkoutLog({
    ...data,
    workout_date: new Date(data.workout_date),
    client_id: user.id,
  });
}

export async function getWorkoutLogsService(user) {
  if (user.role === 'coach') {
    return findWorkoutLogsByCoachId(user.id);
  }

  return findWorkoutLogsByClientId(user.id);
}

export async function getWorkoutLogByIdService(id, user) {
  const workoutLog = await findWorkoutLogById(id);

  if (!workoutLog) {
    const err = new Error('Workout log not found');
    err.status = 404;
    throw err;
  }

  const authorized =
    (user.role === 'client' &&
      workoutLog.client_id === user.id) ||
    (user.role === 'coach' &&
      workoutLog.program.coach_id === user.id);

  if (!authorized) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  return workoutLog;
}

export async function updateWorkoutLogService(id, data, user) {
  const workoutLog = await findWorkoutLogById(id);

  if (!workoutLog) {
    const err = new Error('Workout log not found');
    err.status = 404;
    throw err;
  }

  if (workoutLog.client_id !== user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  return updateWorkoutLog(id, data);
}

export async function deleteWorkoutLogService(id, user) {
  const workoutLog = await findWorkoutLogById(id);

  if (!workoutLog) {
    const err = new Error('Workout log not found');
    err.status = 404;
    throw err;
  }

  if (workoutLog.client_id !== user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  await deleteWorkoutLog(id);
}