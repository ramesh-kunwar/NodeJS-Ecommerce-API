import Category from "../model/category.schema.js";
import asyncHandler from "express-async-handler";

/*****************************************************
 * @desc   Create a new category
 * @route  POST /api/v1/categories
 * @access Private/Admin
 
 *****************************************************/

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // category exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
    user: req.userAuthId,
  });

  res.status(201).json({
    category,
    msg: "Category created successfully",
  });
});
