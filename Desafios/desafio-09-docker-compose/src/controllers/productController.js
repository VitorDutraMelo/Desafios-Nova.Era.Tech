const prisma = require("../config/prisma");

async function createProduct(req, res) {
  try {
    const { name, description, price, quantity } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        quantity: quantity ? Number(quantity) : 0,
      },
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function getProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const productExists = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!productExists) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        price: price !== undefined ? Number(price) : undefined,
        quantity: quantity !== undefined ? Number(quantity) : undefined,
      },
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const productExists = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!productExists) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};