const productRepository = require("../repositories/productRepository");

async function createProduct(data) {
  return productRepository.createProduct(data);
}

async function findAllProducts() {
  return productRepository.findAllProducts();
}

async function findProductById(id) {
  const product = await productRepository.findProductById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
}

module.exports = {
  createProduct,
  findAllProducts,
  findProductById
};