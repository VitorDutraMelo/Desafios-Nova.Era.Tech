import { prisma } from "../prisma";
import { AppError } from "../utils/AppError";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

export class OrderService {
  async checkout(userId: string, items: CheckoutItem[]) {
    return prisma.$transaction(async (tx) => {
      let total = 0;

      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) {
          throw new AppError("Product not found", 404);
        }

        if (product.stock < item.quantity) {
          throw new AppError(`Insufficient stock for product: ${product.name}`);
        }

        total += product.price * item.quantity;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price
        });

        await tx.product.update({
          where: { id: product.id },
          data: {
            stock: product.stock - item.quantity
          }
        });
      }

      const order = await tx.order.create({
        data: {
          userId,
          total,
          items: {
            create: orderItemsData
          },
          payment: {
            create: {
              amount: total,
              status: "PENDING"
            }
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          },
          payment: true
        }
      });

      return order;
    });
  }

  async findAll(userId: string, role: string) {
    if (role === "ADMIN") {
      return prisma.order.findMany({
        include: {
          items: true,
          payment: true,
          user: {
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

    return prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        payment: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(id: string, userId: string, role: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true
          }
        },
        payment: true
      }
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (role !== "ADMIN" && order.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return order;
  }

  async updateStatus(id: string, status: "PENDING" | "PAID" | "CANCELLED") {
    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return prisma.order.update({
      where: { id },
      data: { status }
    });
  }
}