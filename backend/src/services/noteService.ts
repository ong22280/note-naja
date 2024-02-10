import { PrismaClient, Note, CategoryType } from "@prisma/client";

const prisma = new PrismaClient();

async function createNote(
  title: string,
  content: string,
  userId: number,
  category: CategoryType,
  tags: string[]
): Promise<Note> {
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
  category: CategoryType
): Promise<Note | null> {
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
  return updatedNote;
}

async function deleteNote(id: number): Promise<void> {
  await prisma.note.delete({
    where: {
      id,
    },
  });
}

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
