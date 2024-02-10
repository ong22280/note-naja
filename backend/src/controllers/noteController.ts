import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import * as NoteModel from "../services/noteService"; // เรียกใช้ noteModel.ts ที่เราสร้างขึ้นมา

const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, userId, category, tags } = req.body;

  const note = await NoteModel.createNote(
    title,
    content,
    userId,
    category,
    tags
  );

  res.status(201).json(note);
});

const getAllNotes = asyncHandler(async (req: Request, res: Response) => {
  const notes = await NoteModel.getAllNotes();

  res.status(200).json(notes);
});

const getNoteById = asyncHandler(async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);

  const note = await NoteModel.getNoteById(noteId);

  if (!note) {
    throw new BadRequestError("Note not found");
  }

  res.status(200).json(note);
});

const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);
  const { title, content, categoryId } = req.body;

  const updatedNote = await NoteModel.updateNote(
    noteId,
    title,
    content,
    categoryId
  );

  res.status(200).json(updatedNote);
});

const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);

  await NoteModel.deleteNote(noteId);

  res.status(200).json({ message: "Note deleted successfully" });
});

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
