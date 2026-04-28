import prisma from '../config/db.js';

export async function createDiary(data) {
  return prisma.diary.create({
    data,
  });
}

export async function findDiariesByClientId(clientId) {
  return prisma.diary.findMany({
    where: {
      client_id: clientId,
    },
  });
}

export async function findDiariesByCoachId(coachId) {
  return prisma.diary.findMany({
    where: {
      program: {
        coach_id: coachId,
      },
    },
  });
}

export async function findDiaryById(id) {
  return prisma.diary.findUnique({
    where: {
      id,
    },
    include: {
      program: true,
    },
  });
}

export async function updateDiary(id, data) {
  return prisma.diary.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteDiary(id) {
  return prisma.diary.delete({
    where: {
      id,
    },
  });
}