import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as FavoriteService from "../services/favoriteService";

const createFavoriteNote = asyncHandler(async (req: Request, res: Response) => {
  const { userId, noteId } = req.body;

  const favoriteNote = await FavoriteService.createFavoriteNote(userId, noteId);

  res.status(201).json(favoriteNote);
});

const getFavoriteNotesByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);

    const favoriteNotes = await FavoriteService.getFavoriteNotesByUserId(
      userId
    );

    res.status(200).json(favoriteNotes);
  }
);

const deleteFavoriteNoteById = asyncHandler(
  async (req: Request, res: Response) => {
    const favoriteNoteId = parseInt(req.params.id);

    await FavoriteService.deleteFavoriteNoteById(favoriteNoteId);

    res.status(200).json({ message: "Favorite note deleted successfully" });
  }
);

const deleteFavoriteNoteByNoteId = asyncHandler(
  async (req: Request, res: Response) => {
    const noteId = parseInt(req.params.noteId);

    await FavoriteService.deleteFavoriteNoteByNoteId(noteId);

    res.status(200).json({ message: "Favorite note deleted successfully" });
  }
);

export {
  createFavoriteNote,
  getFavoriteNotesByUserId,
  deleteFavoriteNoteById,
  deleteFavoriteNoteByNoteId,
};
