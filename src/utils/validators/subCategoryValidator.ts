import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { check } from "express-validator";
import CategoryModel from "../../models/categoryModel";
import slugify from "slugify";

const createSubCategoryValidator = [
  check("title")
    .notEmpty()
    .withMessage("SubCategory title is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("SubCategory title must be between 2 to 50 characters")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("subCategory must belong to a category")
    .isMongoId()
    .withMessage("invalid category id")
    .custom((value) =>
      CategoryModel.findById(value).then((category) => {
        if (!category) return Promise.reject("category not found");
      })
    ),
  validatorMiddleware,
];

const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid SubCategory id"),
  validatorMiddleware,
];
const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid SubCategory id"),
  check("title").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
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
