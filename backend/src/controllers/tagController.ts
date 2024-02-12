import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import * as TagService from "../services/tagService";

const createTag = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const tag = await TagService.createTag(name);

  res.status(201).json(tag);
});

const getAllTags = asyncHandler(async (req: Request, res: Response) => {
  const tags = await TagService.getAllTags();

  res.status(200).json(tags);
});

const getTagByName = asyncHandler(async (req: Request, res: Response) => {
  const name = req.params.name;

  const tag = await TagService.getTagByName(name);

  if (!tag) {
    throw new BadRequestError("Tag not found");
  }

  res.status(200).json(tag);
});

const deleteTag = asyncHandler(async (req: Request, res: Response) => {
  const name = req.params.name;

  await TagService.deleteTag(name);

  res.status(200).json({ message: "Tag deleted successfully" });
});

export { createTag, getAllTags, getTagByName, deleteTag };
