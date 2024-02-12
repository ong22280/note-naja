import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import * as UserService from "../services/userService";
import { verifyToken } from "../utils/auth";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  res.status(200).json(users);
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  try {
    const decoded: any = verifyToken(req, res);
    if (!decoded || !decoded.userId) {
      throw new BadRequestError("UserId not found");
    }
    const userId = parseInt(decoded.userId);

    const user = await UserService.getUserById(userId);

    if (!user) {
      throw new BadRequestError("User not available");
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  const user = await UserService.getUserById(userId);

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;

  const updatedUser = await UserService.updateUser(userId, name);

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  await UserService.deleteUser(userId);

  res.status(200).json({ message: "User deleted successfully" });
});

import fs from "fs";
import path from "path";
import multer from "multer";

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ใช้ path.join เพื่อรวมเส้นทางโฟลเดอร์เข้าด้วยกัน
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer upload middleware
const upload = multer({ storage: storage }).single("avatar");

const updateAvatar = async (req: Request, res: Response) => {
  // Handle the upload using multer middleware
  upload(req, res, async function (err) {
    if (err) {
      // Handle any upload error
      return res.status(500).json({ message: "Avatar upload failed" });
    }
    try {
      // Get the user ID from request parameters
      const userId = parseInt(req.params.id);

      // Check if req.file is defined before accessing its properties
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Get the file path of the uploaded avatar
      const avatarPath = req.file.path;

      // Update the user's avatar path in the database
      const updatedUser = await UserService.updateAvatar(userId, avatarPath);

      // Respond with the updated user object
      res.status(200).json(updatedUser);
    } catch (error: any) {
      // Handle any other errors
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

export {
  getAllUsers,
  getMe,
  getUserById,
  updateUser,
  deleteUser,
  updateAvatar
};
