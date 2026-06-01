const productService = require("../services/productService");
const productSchema = require("../schemas/productSchema");

async function create(req, res) {
  try {
    const data = productSchema.parse(req.body);
    const product = await productService.createProduct(data);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    handleError(error, res);
  }
}

async function findAll(req, res) {
  try {
    const products = await productService.getProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    handleError(error, res);
  }
}

async function findById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    handleError(error, res);
  }
}

async function update(req, res) {
  try {
    const data = productSchema.parse(req.body);
    const product = await productService.updateProduct(req.params.id, data);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    handleError(error, res);
  }
}

async function remove(req, res) {
  try {
    await productService.deleteProduct(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    handleError(error, res);
  }
}

function handleError(error, res) {
  if (error.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.errors,
    });
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};