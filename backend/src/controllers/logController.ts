import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import * as LogModel from "../services/logService";

const createLog = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, noteId, category, tags } = req.body;

  const log = await LogModel.createLog(title, content, noteId, category, tags);

  res.status(201).json(log);
});

const getAllLogs = asyncHandler(async (req: Request, res: Response) => {
  const logs = await LogModel.getAllLogs();

  res.status(200).json(logs);
});

const getLogById = asyncHandler(async (req: Request, res: Response) => {
  const logId = parseInt(req.params.id);

  const log = await LogModel.getLogById(logId);

  if (!log) {
    throw new BadRequestError("Log not found");
  }

  res.status(200).json(log);
});

const updateLog = asyncHandler(async (req: Request, res: Response) => {
  const logId = parseInt(req.params.id);
  const { title, content, category, tags } = req.body;

  const updatedLog = await LogModel.updateLog(logId, title, content, category, tags);

  res.status(200).json(updatedLog);
});

const deleteLog = asyncHandler(async (req: Request, res: Response) => {
  const logId = parseInt(req.params.id);

  await LogModel.deleteLog(logId);

  res.status(200).json({ message: "Log deleted successfully" });
});

export { createLog, getAllLogs, getLogById, updateLog, deleteLog };
