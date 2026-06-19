import { prisma } from "../prisma";
import { AppError } from "../utils/AppError";

type ProductDTO = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
};

export class ProductService {
  async create(data: ProductDTO, sellerId: string) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId }
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return prisma.product.create({
      data: {
        ...data,
        sellerId
      }
    });
  }

  async findAll() {
    return prisma.product.findMany({
      include: {
        category: true,
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  async update(id: string, data: ProductDTO) {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return prisma.product.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    await prisma.product.delete({
      where: { id }
    });

    return { message: "Product deleted successfully" };
  }
}