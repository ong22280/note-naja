import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import * as CategoryModel from "../services/categoryService";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await CategoryModel.createCategory(name);

  res.status(201).json(category);
});

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await CategoryModel.getAllCategories();

  res.status(200).json(categories);
});

const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);

  const category = await CategoryModel.getCategoryById(categoryId);

  if (!category) {
    throw new BadRequestError("Category not found");
  }

  res.status(200).json(category);
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  const { name } = req.body;

  const updatedCategory = await CategoryModel.updateCategory(categoryId, name);

  res.status(200).json(updatedCategory);
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);

  await CategoryModel.deleteCategory(categoryId);

  res.status(200).json({ message: "Category deleted successfully" });
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
