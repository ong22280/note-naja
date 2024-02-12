import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.post("/signup", authController.signupUser);

router.post("/login", authController.authenticateUser);

router.post("/google-auth", authController.googleAuth);

router.post("/logout", authController.logoutUser);

export default router;
