import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
  async create(request: Request, response: Response) {
    const product = await productService.create(
      request.body,
      request.user!.id
    );

    return response.status(201).json(product);
  }

  async findAll(request: Request, response: Response) {
    const products = await productService.findAll();
    return response.json(products);
  }

  async findById(request: Request, response: Response) {
    const product = await productService.findById(request.params.id);
    return response.json(product);
  }

  async update(request: Request, response: Response) {
    const product = await productService.update(
      request.params.id,
      request.body
    );

    return response.json(product);
  }

  async delete(request: Request, response: Response) {
    const result = await productService.delete(request.params.id);
    return response.json(result);
  }
}