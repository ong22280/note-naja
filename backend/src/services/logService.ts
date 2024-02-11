import { PrismaClient, Log, CategoryType } from "@prisma/client";

const prisma = new PrismaClient();

async function createLog(
  title: string,
  content: string,
  noteId: number,
  category: CategoryType,
  tags: string[]
): Promise<Log> {

  // if tags is undefined, create note without tags

  if (tags === undefined) {
    const log = await prisma.log.create({
      data: {
        title,
        content,
        noteId,
        category,
      },
    });
    return log;
  } else {
    const log = await prisma.log.create({
      data: {
        title,
        content,
        noteId,
        category,
        tags: {
          create: tags.map((name) => ({
            name,
          })),
        },
      },
    });
    return log;
  }
}

async function getAllLogs(): Promise<Log[]> {
  const logs = await prisma.log.findMany(
    {
      include: {
        note: true,
        tags: true,
      },
    }
  );
  return logs;
}

async function getLogById(id: number): Promise<Log | null> {
  const log = await prisma.log.findUnique({
    where: {
      id,
    },
    include: {
      note: true,
      tags: true,
    },
  });
  return log;
}

async function updateLog(
  id: number,
  title: string,
  content: string,
  category: CategoryType,
  tags: string[]
): Promise<Log | null> {

  // if tags is undefined, update note without tags

  if (tags === undefined) {
    const updatedLog = await prisma.log.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        category,
      },
    });
    return updatedLog;
  } else {
    const updatedLog = await prisma.log.update({
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
    return updatedLog;
  }
}

async function deleteLog(id: number): Promise<void> {
  await prisma.log.delete({
    where: {
      id,
    },
  });
}

export {
  createLog,
  getAllLogs,
  getLogById,
  updateLog,
  deleteLog
};
