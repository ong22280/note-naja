import { PrismaClient, Note, CategoryType } from "@prisma/client";

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
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
        category,
        tags: {
          create: tags.map((name) => ({
            name,
          })),
        },
        logs: {
          create: [
            {
              title: title,
              content: content,
              category: category,
              tags: {
                create: tags.map((name) => ({
                  name,
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
  } else {
    const updatedNote = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        category,
        tags: {
          create: tags.map((name) => ({
            name,
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
          create: tags.map((name) => ({
            name,
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
