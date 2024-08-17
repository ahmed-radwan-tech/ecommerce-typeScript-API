import slugify from "slugify";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { check } from "express-validator";

const createCategoryValidator = [
  check("title")
    .notEmpty()
    .withMessage("category title is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("category title must be between 3 to 32 characters")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

const getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];
const updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  check("title").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];
const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];

export {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
