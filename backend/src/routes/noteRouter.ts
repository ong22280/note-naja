import express from "express";
import * as noteController from "../controllers/noteController";

const router = express.Router();

router.post("/", noteController.createNote);

router.get("/", noteController.getAllNotes);

router.get("/:id", noteController.getNoteById);

router.put("/:id", noteController.updateNote);

router.delete("/:id", noteController.deleteNote);

export default router;
