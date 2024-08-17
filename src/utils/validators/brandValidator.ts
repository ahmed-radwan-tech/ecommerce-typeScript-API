import slugify from "slugify";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { check } from "express-validator";

const createBrandValidator = [
  check("title")
    .notEmpty()
    .withMessage("Brand title is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Brand title must be between 3 to 32 characters")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

const getBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id"),
  validatorMiddleware,
];
const updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id"),
  check("title").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];
const deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id"),
  validatorMiddleware,
];

export {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
};
