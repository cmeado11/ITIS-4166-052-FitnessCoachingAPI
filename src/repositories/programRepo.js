import prisma from '../config/db.js';

export async function createProgram(data) {
  return prisma.program.create({
    data,
  });
}

export async function findProgramsByCoachId(coachId) {
  return prisma.program.findMany({
    where: {
      coach_id: coachId,
    },
  });
}

export async function findProgramsByClientId(clientId) {
  return prisma.program.findMany({
    where: {
      client_id: clientId,
    },
  });
}

export async function findProgramById(id) {
  return prisma.program.findUnique({
    where: {
      id,
    },
  });
}

export async function updateProgram(id, data) {
  return prisma.program.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProgram(id) {
  return prisma.program.delete({
    where: {
      id,
    },
  });
}