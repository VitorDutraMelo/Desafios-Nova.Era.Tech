const ProductService = require("../src/services/productService");
const FakeProductRepository = require("../src/database/fakeProductRepository");
const AppError = require("../src/errors/AppError");

describe("ProductService", () => {
  let productRepository;
  let productService;

  beforeEach(() => {
    productRepository = new FakeProductRepository();
    productService = new ProductService(productRepository);
  });

  describe("createProduct", () => {
    it("should create a valid product", async () => {
      
      const productData = {
        name: "Keyboard",
        price: 150,
        quantity: 10
      };

      
      const product = await productService.createProduct(productData);

      expect(product).toHaveProperty("id");
      expect(product.name).toBe("Keyboard");
      expect(product.price).toBe(150);
      expect(product.quantity).toBe(10);
    });

    it("should reject product with missing required fields", async () => {
     
      const productData = {
        name: "Mouse"
      };

      await expect(productService.createProduct(productData)).rejects.toBeInstanceOf(AppError);
      await expect(productService.createProduct(productData)).rejects.toThrow(
        "Name, price and quantity are required"
      );
    });

    it("should reject product with price less than or equal to zero", async () => {
     
      const productData = {
        name: "Monitor",
        price: 0,
        quantity: 5
      };

      
      await expect(productService.createProduct(productData)).rejects.toThrow(
        "Price must be greater than zero"
      );
    });

    it("should reject product with negative quantity", async () => {
      
      const productData = {
        name: "Headset",
        price: 200,
        quantity: -1
      };

      
      await expect(productService.createProduct(productData)).rejects.toThrow(
        "Quantity cannot be negative"
      );
    });

    it("should reject duplicated product name", async () => {
      
      const productData = {
        name: "Laptop",
        price: 2500,
        quantity: 3
      };

      await productService.createProduct(productData);

      await expect(productService.createProduct(productData)).rejects.toThrow(
        "Product already exists"
      );
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product", async () => {
     
      const product = await productService.createProduct({
        name: "Chair",
        price: 300,
        quantity: 4
      });

      
      const updatedProduct = await productService.updateProduct(product.id, {
        price: 350,
        quantity: 6
      });

      
      expect(updatedProduct.price).toBe(350);
      expect(updatedProduct.quantity).toBe(6);
      expect(updatedProduct).toHaveProperty("updatedAt");
    });

    it("should reject update when product does not exist", async () => {
     
      const invalidProductId = 999;

      
      await expect(
        productService.updateProduct(invalidProductId, {
          price: 100
        })
      ).rejects.toThrow("Product not found");
    });

    it("should reject update with invalid price", async () => {
      
      const product = await productService.createProduct({
        name: "Desk",
        price: 500,
        quantity: 2
      });

      
      await expect(
        productService.updateProduct(product.id, {
          price: -50
        })
      ).rejects.toThrow("Price must be greater than zero");
    });

    it("should reject update with negative quantity", async () => {
      
      const product = await productService.createProduct({
        name: "Table",
        price: 700,
        quantity: 2
      });

      await expect(
        productService.updateProduct(product.id, {
          quantity: -3
        })
      ).rejects.toThrow("Quantity cannot be negative");
    });
  });
});