import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategoryById,
  setCategoryIdToBody,
  updateSubCategory,
} from "../services/subCategoryService";
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} from "../utils/validators/subCategoryValidator";

const router: Router = Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
export default router;
