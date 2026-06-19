import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function roleMiddleware(roles: string[]) {
  return function (request: Request, response: Response, next: NextFunction) {
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!roles.includes(request.user.role)) {
      throw new AppError("Forbidden", 403);
    }

    return next();
  };
}