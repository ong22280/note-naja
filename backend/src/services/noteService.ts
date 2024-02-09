import { PrismaClient, Note } from "@prisma/client";

const prisma = new PrismaClient();

async function createNote(
  content: string,
  userId: number,
  categoryId: number
): Promise<Note> {
  const note = await prisma.note.create({
    data: {
      content,
      userId,
      categoryId,
    },
  });
  return note;
}

async function getAllNotes(): Promise<Note[]> {
  const notes = await prisma.note.findMany();
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
      category: true,
      tags: true,
    },
  });
  return note;
}

async function updateNote(
  id: number,
  content: string,
  categoryId: number
): Promise<Note | null> {
  const updatedNote = await prisma.note.update({
    where: {
      id,
    },
    data: {
      content,
      categoryId,
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

// async function getUserOfNote(id: number): Promise<Note | null> {
//   const note = await prisma.note.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       user: true,
//     },
//   });
//   return note;
// }

// async function getLogsOfNote(id: number): Promise<Note | null> {
//   const note = await prisma.note.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       logs: true,
//     },
//   });
//   return note;
// }

// async function getCategoryOfNote(id: number): Promise<Note | null> {
//   const note = await prisma.note.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       category: true,
//     },
//   });
//   return note;
// }

// async function getTagsOfNote(id: number): Promise<Note | null> {
//   const note = await prisma.note.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       tags: true,
//     },
//   });
//   return note;
// }

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
