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

async function getTagByName(name: string): Promise<Tag | null> {
  const tag = await prisma.tag.findUnique({
    where: {
      name,
    },
    include: {
      notes: true,
    },
  });
  return tag;
}


async function deleteTag(name: string): Promise<void> {
  await prisma.tag.delete({
    where: {
      name,
    },
  });
}

async function getAllNotesOfTag(name: string): Promise<Tag | null> {
  const tag = await prisma.tag.findUnique({
    where: {
      name,
    },
    include: {
      notes: true,
    },
  });
  return tag;
}

export { createTag, getAllTags, getTagByName, deleteTag, getAllNotesOfTag };
