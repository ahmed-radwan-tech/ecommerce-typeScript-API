import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { check } from "express-validator";

const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("SubCategory name must be between 2 to 50 characters"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must belong to a category")
    .isMongoId()
    .withMessage("invalid category id"),
  validatorMiddleware,
];

const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid SubCategory id"),
  validatorMiddleware,
];
const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid SubCategory id"),
  validatorMiddleware,
];
const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid SubCategory id"),
  validatorMiddleware,
];

export {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
};
