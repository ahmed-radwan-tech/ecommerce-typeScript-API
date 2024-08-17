import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/productModel";
import asyncHandler from "express-async-handler";
import ApiFeatures from "../utils/apiFeatures";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlersFactory";

const getproducts = getAll(ProductModel);
const getProductById = getOne(ProductModel);
const createProduct = createOne(ProductModel);
const updateProduct = updateOne(ProductModel);
const deleteProduct = deleteOne(ProductModel);

export {
  getproducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
