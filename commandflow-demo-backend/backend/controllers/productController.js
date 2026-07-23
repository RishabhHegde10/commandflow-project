const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true
      }
    });

    res.json(products);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        productId
      },
      include: {
        variants: true
      }
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch product"
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      brand,
      category,
      description,
      status,
      variants
    } = req.body;

    const product = await prisma.product.create({
      data: {
        productId,
        name,
        brand,
        category,
        description,
        status,

        variants: {
          create: variants
        }
      },

      include: {
        variants: true
      }
    });

    res.status(201).json(product);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create product"
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const {
      name,
      brand,
      category,
      description,
      status,
      price,
      stock
    } = req.body;

    // First update the product fields
    const updatedProduct = await prisma.product.update({
      where: {
        productId
      },
      data: {
        name,
        brand,
        category,
        description,
        status
      },
      include: {
        variants: true
      }
    });

    // If price or stock is provided, update the first variant (simplification for demo)
    if (updatedProduct.variants.length > 0 && (price !== undefined || stock !== undefined)) {
      await prisma.productVariant.update({
        where: { id: updatedProduct.variants[0].id },
        data: {
          ...(price !== undefined && { price }),
          ...(stock !== undefined && { stock })
        }
      });
      // Refresh the product to get the updated variant
      const refreshedProduct = await prisma.product.findUnique({
        where: { productId },
        include: { variants: true }
      });
      return res.json(refreshedProduct);
    }

    res.json(updatedProduct);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product"
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    await prisma.product.delete({
      where: {
        productId
      }
    });

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product"
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};