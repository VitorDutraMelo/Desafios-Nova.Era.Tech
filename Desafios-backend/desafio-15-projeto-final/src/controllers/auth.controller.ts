import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(request: Request, response: Response) {
    const user = await authService.register(request.body);
    return response.status(201).json(user);
  }

  async login(request: Request, response: Response) {
    const result = await authService.login(request.body);
    return response.json(result);
  }

  async me(request: Request, response: Response) {
    const user = await authService.me(request.user!.id);
    return response.json(user);
  }
}