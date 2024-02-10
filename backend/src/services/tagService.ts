import { PrismaClient, Tag } from "@prisma/client";

const prisma = new PrismaClient();

async function createTag(name: string): Promise<Tag> {

  // if tag already exists, return the tag
  const tag = await prisma.tag.findUnique({
    where: {
      name,
    },
  });

  if (tag) {
    return tag;
  } else {
    const newTag = await prisma.tag.create({
      data: {
        name,
      },
    });
    return newTag;
  }
}

async function getAllTags(): Promise<Tag[]> {
  const tags = await prisma.tag.findMany();
  return tags;
}

async function getTagById(id: number): Promise<Tag | null> {
  const tag = await prisma.tag.findUnique({
    where: {
      id,
    },
    include: {
      notes: true,
    },
  });
  return tag;
}

async function updateTag(id: number, name: string): Promise<Tag | null> {
  const updatedTag = await prisma.tag.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return updatedTag;
}

async function deleteTag(id: number): Promise<void> {
  await prisma.tag.delete({
    where: {
      id,
    },
  });
}

async function getAllNotesOfTag(id: number): Promise<Tag | null> {
  const tag = await prisma.tag.findUnique({
    where: {
      id,
    },
    include: {
      notes: true,
    },
  });
  return tag;
}

export { createTag, getAllTags, getTagById, updateTag, deleteTag, getAllNotesOfTag };
