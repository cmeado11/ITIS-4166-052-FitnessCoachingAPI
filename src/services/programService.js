import {
  createProgram,
  findProgramsByCoachId,
  findProgramsByClientId,
  findProgramById,
  updateProgram,
  deleteProgram,
} from '../repositories/programRepo.js';

import { findUserById } from '../repositories/userRepo.js';

export async function createProgramService(data, coachId) {
  const client = await findUserById(data.client_id);

  if (!client || client.role !== 'client') {
    const err = new Error('Client not found');
    err.status = 404;
    throw err;
  }

  return createProgram({
    ...data,
    coach_id: coachId,
  });
}

export async function getProgramsService(user) {
  if (user.role === 'coach') {
    return findProgramsByCoachId(user.id);
  }

  return findProgramsByClientId(user.id);
}

export async function getProgramByIdService(id, user) {
  const program = await findProgramById(id);

  if (!program) {
    const err = new Error('Program not found');
    err.status = 404;
    throw err;
  }

  const authorized =
    (user.role === 'coach' && program.coach_id === user.id) ||
    (user.role === 'client' && program.client_id === user.id);

  if (!authorized) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  return program;
}

export async function updateProgramService(id, data, user) {
  const program = await findProgramById(id);

  if (!program) {
    const err = new Error('Program not found');
    err.status = 404;
    throw err;
  }

  if (program.coach_id !== user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  return updateProgram(id, data);
}

export async function deleteProgramService(id, user) {
  const program = await findProgramById(id);

  if (!program) {
    const err = new Error('Program not found');
    err.status = 404;
    throw err;
  }

  if (program.coach_id !== user.id) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  await deleteProgram(id);
}