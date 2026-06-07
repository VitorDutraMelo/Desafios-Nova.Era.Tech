const productService = require("../services/productService");
const { createProductSchema } = require("../validations/productValidation");

async function createProduct(req, res, next) {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await productService.createProduct(data);

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function findAllProducts(req, res, next) {
  try {
    const products = await productService.findAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function findProductById(req, res, next) {
  try {
    const product = await productService.findProductById(Number(req.params.id));

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  findAllProducts,
  findProductById
};