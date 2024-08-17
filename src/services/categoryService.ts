import CategoryModel from "../models/categoryModel";

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
