import { NextFunction, Request, Response } from "express";
import CategoryModel from "../models/categoryModel";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlersFactory";

const getCategories = getAll(CategoryModel);
const getCategoryById = getOne(CategoryModel);
const createCategory = createOne(CategoryModel);
const updateCategory = updateOne(CategoryModel);
const deleteCategory = deleteOne(CategoryModel);

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
