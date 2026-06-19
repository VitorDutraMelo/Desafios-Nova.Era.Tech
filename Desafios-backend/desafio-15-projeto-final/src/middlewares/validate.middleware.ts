import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return function (request: Request, response: Response, next: NextFunction) {
    const data = schema.parse(request.body);
    request.body = data;
    return next();
  };
}