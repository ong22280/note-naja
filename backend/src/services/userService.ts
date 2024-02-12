import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}

async function getUserById(id: number): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      notes: true,
      favorites: true,
    },
  });
  return user;
}

async function updateUser(id: number, name: string): Promise<User | null> {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return updatedUser;
}

async function deleteUser(id: number): Promise<void> {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

async function updateAvatar(
  userId: number,
  avatarPath: string
): Promise<User | null> {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: avatarPath, // Set the avatar path
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating avatar:", error);
    return null;
  }
}

export { getAllUsers, getUserById, updateUser, deleteUser, updateAvatar };
