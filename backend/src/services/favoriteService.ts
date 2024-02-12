import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createFavoriteNote(userId: number, noteId: number) {
  const favoriteNote = await prisma.favorite.create({
    data: {
      userId,
      noteId,
    },
  });
  return favoriteNote;
}

async function getFavoriteNotesByUserId(userId: number) {
  const favoriteNotes = await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      note: true,
    },
  });
  return favoriteNotes;
}

async function deleteFavoriteNoteById(favoriteId: number) {
  await prisma.favorite.delete({
    where: {
      id: favoriteId,
    },
  });
}

async function deleteFavoriteNoteByNoteId(noteId: number) {
  await prisma.favorite.deleteMany({
    where: {
      noteId,
    },
  });
}

export { createFavoriteNote, getFavoriteNotesByUserId, deleteFavoriteNoteById, deleteFavoriteNoteByNoteId };
