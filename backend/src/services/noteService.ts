import { PrismaClient, Note, CategoryType, Tag } from "@prisma/client";

const prisma = new PrismaClient();

async function createNote(
  title: string,
  content: string,
  userId: number,
  category: CategoryType,
  tags: string[]
): Promise<Note> {
  // if tags is undefined, create note without tags

  if (tags === undefined) {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
        category,
        logs: {
          create: [
            {
              title: title,
              content: content,
              category: category,
            },
          ],
        },
      },
    });
    return note;
  } else {
    // check if tag already exists, if not, create tag
    const existingTags = await prisma.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    });

    const existingTagNames = existingTags.map((tag) => tag.name);

    const newTags = tags.filter((tag) => !existingTagNames.includes(tag));

    await prisma.tag.createMany({
      data: newTags.map((name) => ({
        name,
      })),
      skipDuplicates: true,
    });

    const createdTags = await prisma.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    });

    const allTags = [...existingTags, ...createdTags];

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
        category,
        tags: {
          connect: allTags.map((tag) => ({
            id: tag.id,
          })),
        },
        logs: {
          create: [
            {
              title: title,
              content: content,
              category: category,
              tags: {
                connect: allTags.map((tag) => ({
                  id: tag.id,
                })),
              },
            },
          ],
        },
      },
    });

    return note;
  }
}

async function getAllNotes(): Promise<Note[]> {
  const notes = await prisma.note.findMany({
    include: {
      user: true,
      logs: true,
      tags: true,
    },
  });
  return notes;
}

async function getNoteById(id: number): Promise<Note | null> {
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      logs: true,
      tags: true,
    },
  });
  return note;
}

async function updateNote(
  id: number,
  title: string,
  content: string,
  category: CategoryType,
  tags: string[]
): Promise<Note | null> {
  // if tags is undefined, update note without tags

  if (tags === undefined) {
    const updatedNote = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        category,
      },
    });

    // create log
    await prisma.log.create({
      data: {
        title: title,
        content: content,
        noteId: id,
        category: category,
      },
    });

    return updatedNote;
  } else if (tags.length === 0) {
    const updatedNote = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        category,
        tags: { set: [] },
      },
    });

    // create log
    await prisma.log.create({
      data: {
        title: title,
        content: content,
        noteId: id,
        category: category,
      },
    });

    return updatedNote;
  } else {
    console.log(tags);

    // before update, check if tag is unused, if unused, disconnect tag
    const unusedTags = await prisma.tag.findMany({
      where: {
        name: {
          notIn: tags,
        },
      },
    });

    console.log("unusedTags: ", unusedTags);

    // check if tag already exists, if not, create tag
    const existingTags = await prisma.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    });

    const existingTagNames = existingTags.map((tag) => tag.name);

    const newTags = tags.filter((tag) => !existingTagNames.includes(tag));

    if (unusedTags.length > 0) {
      await prisma.note.update({
        where: {
          id,
        },
        data: {
          tags: {
            disconnect: unusedTags.map((tag) => ({
              id: tag.id,
            })),
          },
        },
      });
    }

    await prisma.tag.createMany({
      data: newTags.map((name) => ({
        name,
      })),
      skipDuplicates: true,
    });

    const createdTags = await prisma.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    });

    const allTags = [...existingTags, ...createdTags];

    const updatedNote = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        category,
        tags: {
          connect: allTags.map((tag) => ({
            id: tag.id,
          })),
        },
      },
    });

    // create log

    await prisma.log.create({
      data: {
        title: title,
        content: content,
        noteId: id,
        category: category,
        tags: {
          connect: allTags.map((tag) => ({
            id: tag.id,
          })),
        },
      },
    });

    return updatedNote;
  }
}

async function deleteNote(id: number): Promise<void> {
  await prisma.note.delete({
    where: {
      id,
    },
  });
}

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
