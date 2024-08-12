import { NextFunction, Request, Response } from "express";
import SubCategoryModel from "../models/subCategoryModel";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError";

const isExists = (
  subCategory: any,
  res: Response,
  next: NextFunction,
  content: any
) => {
  if (subCategory) {
    return res.status(200).json({ data: content });
  }
  next(new ApiError("subCategory not found", 404));
};

const setCategoryIdToBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

const getSubCategories = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || Number(process.env.DEFAULT_PAGE),
      limit = Number(req.query.limit) || Number(process.env.DEFAULT_LIMIT),
      skip = (page - 1) * limit;
    let filterObject = {};
    if (req.params.categoryId) {
      filterObject = { category: req.params.categoryId };
    }
    const subCategories = await SubCategoryModel.find(filterObject)
      .skip(skip)
      .limit(limit);
    res
      .status(200)
      .json({ results: subCategories.length, page, data: subCategories });
  }
);
const getSubCategoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const subCategory = await SubCategoryModel.findById(id);
    isExists(subCategory, res, next, subCategory);
  }
);

const createSubCategory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const subCategory = await SubCategoryModel.create({
      name: req.body.name,
      slug: slugify(req.body.name),
      category: req.body.category,
    });
    res.status(201).json({ data: subCategory });
  }
);
const updateSubCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { name, category } = req.body;
    const subCategory = await SubCategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), category },
      { new: true }
    );
    isExists(subCategory, res, next, subCategory);
  }
);
const deleteSubCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const subCategory = await SubCategoryModel.findByIdAndDelete(id);
    isExists(subCategory, res, next, "subCategory deleted successfully");
  }
);

export {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
};
