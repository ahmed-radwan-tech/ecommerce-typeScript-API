import { NextFunction, Request, Response } from "express";
import categoryModel from "../models/categoryModel";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError";

function isExistsCategory(
  category: any,
  res: Response,
  next: NextFunction,
  content: any
) {
  if (category) {
    return res.status(200).json({ data: content });
  }
  next(new ApiError("Category not found", 404));
}

const getCategories = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || Number(process.env.DEFAULT_PAGE),
      limit = Number(req.query.limit) || Number(process.env.DEFAULT_LIMIT),
      skip = (page - 1) * limit;
    const categories = await categoryModel.find().skip(skip).limit(limit);
    res
      .status(200)
      .json({ results: categories.length, page, data: categories });
  }
);
const getCategoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    isExistsCategory(category, res, next, category);
  }
);
const addCategory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const category = await categoryModel.create({
      name: req.body.name,
      slug: slugify(req.body.name),
    });
    res.status(201).json({ data: category });
  }
);
const updateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    isExistsCategory(category, res, next, category);
  }
);
const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    isExistsCategory(category, res, next, "category deleted successfully");
  }
);

export {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
