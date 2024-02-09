import express from "express";
import {
  signupUser,
  authenticateUser,
  logoutUser,
} from "../controllers/authController";

import upload from "../middleware/multerMiddleware";


const router = express.Router();

router.post("/signup",upload.single('avatar'), signupUser);
router.post("/login", authenticateUser);
router.post("/logout", logoutUser);

export default router;
