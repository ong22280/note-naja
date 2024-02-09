import express from "express";
import * as tagController from "../controllers/tagController";

const router = express.Router();

router.post("/", tagController.createTag);

router.get("/", tagController.getAllTags);

router.get("/:id", tagController.getTagById);

router.put("/:id", tagController.updateTag);

router.delete("/:id", tagController.deleteTag);

export default router;
