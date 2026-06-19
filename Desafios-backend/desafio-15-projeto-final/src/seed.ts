import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@orderflow.com",
      password,
      role: "ADMIN"
    }
  });

  const seller = await prisma.user.create({
    data: {
      name: "Seller User",
      email: "seller@orderflow.com",
      password,
      role: "SELLER"
    }
  });

  const customer = await prisma.user.create({
    data: {
      name: "Customer User",
      email: "customer@orderflow.com",
      password,
      role: "CUSTOMER"
    }
  });

  const electronics = await prisma.category.create({
    data: {
      name: "Electronics"
    }
  });

  const books = await prisma.category.create({
    data: {
      name: "Books"
    }
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Mechanical Keyboard",
        description: "A professional mechanical keyboard",
        price: 89.99,
        stock: 20,
        categoryId: electronics.id,
        sellerId: seller.id
      },
      {
        name: "Backend Development Book",
        description: "A complete book about backend development",
        price: 39.99,
        stock: 15,
        categoryId: books.id,
        sellerId: seller.id
      }
    ]
  });

  console.log("✅ Seed completed successfully");
  console.log({
    admin: admin.email,
    seller: seller.email,
    customer: customer.email,
    password: "123456"
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });