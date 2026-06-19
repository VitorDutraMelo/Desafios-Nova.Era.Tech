import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  async create(request: Request, response: Response) {
    const category = await categoryService.create(request.body.name);
    return response.status(201).json(category);
  }

  async findAll(request: Request, response: Response) {
    const categories = await categoryService.findAll();
    return response.json(categories);
  }

  async update(request: Request, response: Response) {
    const category = await categoryService.update(
      request.params.id,
      request.body.name
    );

    return response.json(category);
  }

  async delete(request: Request, response: Response) {
    const result = await categoryService.delete(request.params.id);
    return response.json(result);
  }
}