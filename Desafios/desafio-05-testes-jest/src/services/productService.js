const AppError = require("../errors/AppError");

class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(data) {
    const { name, price, quantity } = data;

    if (!name || price === undefined || quantity === undefined) {
      throw new AppError("Name, price and quantity are required", 400);
    }

    if (price <= 0) {
      throw new AppError("Price must be greater than zero", 400);
    }

    if (quantity < 0) {
      throw new AppError("Quantity cannot be negative", 400);
    }

    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError("Product already exists", 409);
    }

    const product = await this.productRepository.create({
      name,
      price,
      quantity
    });

    return product;
  }

  async updateProduct(id, data) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (data.price !== undefined && data.price <= 0) {
      throw new AppError("Price must be greater than zero", 400);
    }

    if (data.quantity !== undefined && data.quantity < 0) {
      throw new AppError("Quantity cannot be negative", 400);
    }

    const updatedProduct = await this.productRepository.update(id, data);

    return updatedProduct;
  }
}

module.exports = ProductService;