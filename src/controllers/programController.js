import {
  createProgramService,
  getProgramsService,
  getProgramByIdService,
  updateProgramService,
  deleteProgramService,
} from '../services/programService.js';

export async function createProgramHandler(req, res) {
  const program = await createProgramService(req.body, req.user.id);
  res.status(201).json(program);
}

export async function getProgramsHandler(req, res) {
  const programs = await getProgramsService(req.user);
  res.status(200).json(programs);
}

export async function getProgramByIdHandler(req, res) {
  const id = Number(req.params.id);
  const program = await getProgramByIdService(id, req.user);
  res.status(200).json(program);
}

export async function updateProgramHandler(req, res) {
  const id = Number(req.params.id);
  const program = await updateProgramService(id, req.body, req.user);
  res.status(200).json(program);
}

export async function deleteProgramHandler(req, res) {
  const id = Number(req.params.id);
  await deleteProgramService(id, req.user);
  res.status(204).send();
}