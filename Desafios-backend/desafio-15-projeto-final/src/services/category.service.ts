import { prisma } from "../prisma";
import { AppError } from "../utils/AppError";

export class CategoryService {
  async create(name: string) {
    const exists = await prisma.category.findUnique({
      where: { name }
    });

    if (exists) {
      throw new AppError("Category already exists");
    }

    return prisma.category.create({
      data: { name }
    });
  }

  async findAll() {
    return prisma.category.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  async update(id: string, name: string) {
    const category = await prisma.category.findUnique({
      where: { id }
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return prisma.category.update({
      where: { id },
      data: { name }
    });
  }

  async delete(id: string) {
    const category = await prisma.category.findUnique({
      where: { id }
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    await prisma.category.delete({
      where: { id }
    });

    return { message: "Category deleted successfully" };
  }
}