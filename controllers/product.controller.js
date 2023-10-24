import Product from "../model/product.schema.js";
import asyncHandler from "express-async-handler";

/*****************************************************
 * @desc   Create a new product
 * @route  POST /api/v1/products
 * @access Private/Admin
 *****************************************************/

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  // product exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });

  // push the product to category

  res.status(201).json({
    product,
    msg: "Product created successfully",
  });
});

/*****************************************************
 * @desc   Get all products
 * @route  GET /api/v1/products
 * @access Public
 *****************************************************/

export const getProduct = asyncHandler(async (req, res) => {
  // query
  let productQuery = Product.find({});

  // search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    });
  }

  // filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: {
        $regex: req.query.brand,
        $options: "i",
      },
    });
  }

  // filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: {
        $regex: req.query.category,
        $options: "i",
      },
    });
  }

  // filter by color
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: {
        $regex: req.query.colors,
        $options: "i",
      },
    });
  }
  // filter by sizes
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: {
        $regex: req.query.sizes,
        $options: "i",
      },
    });
  }

  // filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    console.log(priceRange);
    productQuery = productQuery.find({
      price: {
        $gte: priceRange[0],
        $lte: priceRange[1],
      },
    });
  }

  const products = await productQuery;

  res.status(200).json({
    length: products.length,
    products,
    msg: "All products",
  });
});
