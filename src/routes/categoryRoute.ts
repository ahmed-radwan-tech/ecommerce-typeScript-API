import { Router } from "express";
import {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validators/categoryValidator";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../services/categoryService";
import subCategoryRoute from "./subCategoryRoute";

const router: Router = Router();

router.use("/:categoryId/sub-categories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
export default router;
