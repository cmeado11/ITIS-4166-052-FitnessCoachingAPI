import prisma from '../config/db.js';

export async function createWorkoutLog(data) {
  return prisma.workoutLog.create({
    data,
  });
}

export async function findWorkoutLogsByClientId(clientId) {
  return prisma.workoutLog.findMany({
    where: {
      client_id: clientId,
    },
  });
}

export async function findWorkoutLogsByCoachId(coachId) {
  return prisma.workoutLog.findMany({
    where: {
      program: {
        coach_id: coachId,
      },
    },
  });
}

export async function findWorkoutLogById(id) {
  return prisma.workoutLog.findUnique({
    where: {
      id,
    },
    include: {
      program: true,
    },
  });
}

export async function updateWorkoutLog(id, data) {
  return prisma.workoutLog.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteWorkoutLog(id) {
  return prisma.workoutLog.delete({
    where: {
      id,
    },
  });
}