import { PrismaClient, Log } from "@prisma/client";

const prisma = new PrismaClient();

async function createLog(content: string, noteId: number): Promise<Log> {
  const log = await prisma.log.create({
    data: {
      content,
      noteId,
    },
  });
  return log;
}

async function getAllLogs(): Promise<Log[]> {
  const logs = await prisma.log.findMany();
  return logs;
}

async function getLogById(id: number): Promise<Log | null> {
  const log = await prisma.log.findUnique({
    where: {
      id,
    },
    include: {
      note: true,
    },
  });
  return log;
}

async function updateLog(id: number, content: string): Promise<Log | null> {
  const updatedLog = await prisma.log.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
  return updatedLog;
}

async function deleteLog(id: number): Promise<void> {
  await prisma.log.delete({
    where: {
      id,
    },
  });
}

async function getNoteOfLog(id: number): Promise<Log | null> {
  const log = await prisma.log.findUnique({
    where: {
      id,
    },
    include: {
      note: true,
    },
  });
  return log;
}

export { createLog, getAllLogs, getLogById, updateLog, deleteLog, getNoteOfLog };
