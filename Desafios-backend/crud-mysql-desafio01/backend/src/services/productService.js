const productRepository = require("../repositories/productRepository");

async function createProduct(data) {
  return productRepository.create(data);
}

async function getProducts() {
  return productRepository.findAll();
}

async function getProductById(id) {
  const product = await productRepository.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
}

async function updateProduct(id, data) {
  const product = await productRepository.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return productRepository.update(id, data);
}

async function deleteProduct(id) {
  const product = await productRepository.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  await productRepository.remove(id);
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};