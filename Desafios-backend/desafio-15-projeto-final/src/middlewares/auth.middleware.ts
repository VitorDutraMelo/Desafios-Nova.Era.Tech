import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

type TokenPayload = {
  id: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not provided", 401);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Invalid token format", 401);
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload;
    request.user = decoded;
    return next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}