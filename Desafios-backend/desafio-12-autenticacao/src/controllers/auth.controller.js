const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const {
  registerSchema,
  loginSchema
} = require("../validations/auth.validation");

async function register(request, response, next) {
  try {
    const data = registerSchema.parse(request.body);

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (userAlreadyExists) {
      return response.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || "MEMBER"
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return response.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    next(error);
  }
}

async function login(request, response, next) {
  try {
    const data = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (!user) {
      return response.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordIsValid = await bcrypt.compare(data.password, user.password);

    if (!passwordIsValid) {
      return response.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
      }
    );

    return response.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login
};