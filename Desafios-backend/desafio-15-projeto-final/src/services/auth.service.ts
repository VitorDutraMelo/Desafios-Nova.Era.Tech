import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/jwt";

type RegisterDTO = {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "SELLER" | "CUSTOMER";
};

type LoginDTO = {
  email: string;
  password: string;
};

export class AuthService {
  async register(data: RegisterDTO) {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (userExists) {
      throw new AppError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || "CUSTOMER"
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return user;
  }

  async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken({
      id: user.id,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}