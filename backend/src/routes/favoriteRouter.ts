import express from "express";
import * as favoriteController from "../controllers/favoriteController";

const router = express.Router();

router.post("/", favoriteController.createFavoriteNote);

router.get("/:userId", favoriteController.getFavoriteNotesByUserId);

router.delete("/:id", favoriteController.deleteFavoriteNoteById);

router.delete("/note/:noteId", favoriteController.deleteFavoriteNoteByNoteId);

export default router;
