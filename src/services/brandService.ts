import BrandModel from "../models/brandModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlersFactory";

const getBrands = getAll(BrandModel);
const getBrandById = getOne(BrandModel);
const createBrand = createOne(BrandModel);
const updateBrand = updateOne(BrandModel);
const deleteBrand = deleteOne(BrandModel);

export { getBrands, getBrandById, createBrand, updateBrand, deleteBrand };
