import { NextFunction, Request, Response } from "express";
import SubCategoryModel from "../models/subCategoryModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlersFactory";

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

const getSubCategories = getAll(SubCategoryModel);
const getSubCategoryById = getOne(SubCategoryModel);
const createSubCategory = createOne(SubCategoryModel);
const updateSubCategory = updateOne(SubCategoryModel);
const deleteSubCategory = deleteOne(SubCategoryModel);

export {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
};
