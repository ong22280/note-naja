import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import * as TagModel from "../services/tagService";

const createTag = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const tag = await TagModel.createTag(name);

  res.status(201).json(tag);
});

const getAllTags = asyncHandler(async (req: Request, res: Response) => {
  const tags = await TagModel.getAllTags();

  res.status(200).json(tags);
});

const getTagById = asyncHandler(async (req: Request, res: Response) => {
  const tagId = parseInt(req.params.id);

  const tag = await TagModel.getTagById(tagId);

  if (!tag) {
    throw new BadRequestError("Tag not found");
  }

  res.status(200).json(tag);
});

const updateTag = asyncHandler(async (req: Request, res: Response) => {
  const tagId = parseInt(req.params.id);
  const { name } = req.body;

  const updatedTag = await TagModel.updateTag(tagId, name);

  res.status(200).json(updatedTag);
});

const deleteTag = asyncHandler(async (req: Request, res: Response) => {
  const tagId = parseInt(req.params.id);

  await TagModel.deleteTag(tagId);

  res.status(200).json({ message: "Tag deleted successfully" });
});

export { createTag, getAllTags, getTagById, updateTag, deleteTag };
