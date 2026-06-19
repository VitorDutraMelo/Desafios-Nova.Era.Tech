import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

const orderService = new OrderService();

export class OrderController {
  async checkout(request: Request, response: Response) {
    const order = await orderService.checkout(
      request.user!.id,
      request.body.items
    );

    return response.status(201).json(order);
  }

  async findAll(request: Request, response: Response) {
    const orders = await orderService.findAll(
      request.user!.id,
      request.user!.role
    );

    return response.json(orders);
  }

  async findById(request: Request, response: Response) {
    const order = await orderService.findById(
      request.params.id,
      request.user!.id,
      request.user!.role
    );

    return response.json(order);
  }

  async updateStatus(request: Request, response: Response) {
    const order = await orderService.updateStatus(
      request.params.id,
      request.body.status
    );

    return response.json(order);
  }
}