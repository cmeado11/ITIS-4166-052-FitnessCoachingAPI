import {
  createWorkoutLogService,
  getWorkoutLogsService,
  getWorkoutLogByIdService,
  updateWorkoutLogService,
  deleteWorkoutLogService,
} from '../services/workoutLogService.js';

export async function createWorkoutLogHandler(req, res) {
  const workoutLog = await createWorkoutLogService(req.body, req.user);
  res.status(201).json(workoutLog);
}

export async function getWorkoutLogsHandler(req, res) {
  const workoutLogs = await getWorkoutLogsService(req.user);
  res.status(200).json(workoutLogs);
}

export async function getWorkoutLogByIdHandler(req, res) {
  const id = Number(req.params.id);
  const workoutLog = await getWorkoutLogByIdService(id, req.user);
  res.status(200).json(workoutLog);
}

export async function updateWorkoutLogHandler(req, res) {
  const id = Number(req.params.id);
  const workoutLog = await updateWorkoutLogService(id, req.body, req.user);
  res.status(200).json(workoutLog);
}

export async function deleteWorkoutLogHandler(req, res) {
  const id = Number(req.params.id);
  await deleteWorkoutLogService(id, req.user);
  res.status(204).send();
}