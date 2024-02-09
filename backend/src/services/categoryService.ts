import { PrismaClient, Category, CategoryType } from "@prisma/client";

const prisma = new PrismaClient();

async function createCategory(name: CategoryType): Promise<Category> {
  const category = await prisma.category.create({
    data: {
      name,
    },
  });
  return category;
}

async function getAllCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  return categories;
}

async function getCategoryById(id: number): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      notes: true,
    },
  });
  return category;
}

async function updateCategory(
  id: number,
  name: CategoryType
): Promise<Category | null> {
  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return updatedCategory;
}

async function deleteCategory(id: number): Promise<void> {
  await prisma.category.delete({
    where: {
      id,
    },
  });
}

// async function getAllNotesOfCategory(id: number): Promise<Category | null> {
//   const category = await prisma.category.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       notes: true,
//     },
//   });
//   return category;
// }

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
