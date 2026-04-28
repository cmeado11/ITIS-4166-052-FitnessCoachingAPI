import {
  createDiaryService,
  getDiariesService,
  getDiaryByIdService,
  updateDiaryService,
  deleteDiaryService,
} from '../services/diaryService.js';

export async function createDiaryHandler(req, res) {
  const diary = await createDiaryService(req.body, req.user);
  res.status(201).json(diary);
}

export async function getDiariesHandler(req, res) {
  const diaries = await getDiariesService(req.user);
  res.status(200).json(diaries);
}

export async function getDiaryByIdHandler(req, res) {
  const id = Number(req.params.id);
  const diary = await getDiaryByIdService(id, req.user);
  res.status(200).json(diary);
}

export async function updateDiaryHandler(req, res) {
  const id = Number(req.params.id);
  const diary = await updateDiaryService(id, req.body, req.user);
  res.status(200).json(diary);
}

export async function deleteDiaryHandler(req, res) {
  const id = Number(req.params.id);
  await deleteDiaryService(id, req.user);
  res.status(204).send();
}