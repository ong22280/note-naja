import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import * as UserModel from "../services/userService";
import { verifyToken } from "../utils/auth";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.getAllUsers();

  res.status(200).json(users);
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  try {
    const decoded: any = verifyToken(req, res);
    if (!decoded || !decoded.userId) {
      throw new BadRequestError("UserId not found");
    }
    const userId = parseInt(decoded.userId);

    const user = await UserModel.getUserById(userId);

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

  const user = await UserModel.getUserById(userId);

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { name, email, password } = req.body;

  const updatedUser = await UserModel.updateUser(userId, name, email, password);

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  await UserModel.deleteUser(userId);

  res.status(200).json({ message: "User deleted successfully" });
});

export {
  getAllUsers,
  getMe,
  getUserById,
  updateUser,
  deleteUser
};
