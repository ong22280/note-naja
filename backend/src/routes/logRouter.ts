import express from "express";
import * as logController from "../controllers/logController";

const router = express.Router();

router.post("/", logController.createLog);

router.get("/", logController.getAllLogs);

router.get("/:id", logController.getLogById);

router.put("/:id", logController.updateLog);

router.delete("/:id", logController.deleteLog);

export default router;
