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
    },
  });
  return user;
}

async function updateUser(
  id: number,
  name: string,
  email: string,
  password: string
): Promise<User | null> {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
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

export { getAllUsers, getUserById, updateUser, deleteUser };
