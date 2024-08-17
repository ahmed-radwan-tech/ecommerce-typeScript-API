import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import CategoryModel from "../../models/categoryModel";
import SubCategoryModel from "../../models/subCategoryModel";
import BrandModel from "../../models/brandModel";
import slugify from "slugify";

const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ max: 2000 })
    .withMessage("description must be at most 2000 characters"),
  check("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isNumeric()
    .withMessage("quantity must be a number"),
  check("sold").optional().isNumeric().withMessage("sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number")
    .isLength({ max: 32 })
    .withMessage("price must be at most 32 characters"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error("priceAfterDiscount must be less than price");
      }
      return true;
    }),
  check("imageCover").notEmpty().withMessage("imageCover is required"),
  check("colors").optional().isArray().withMessage("colors must be an array"),
  check("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("category must be a valid mongo id")
    .custom((value) =>
      CategoryModel.findById(value).then((category) => {
        if (!category) return Promise.reject("category not found");
      })
    ),
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("subCategories must be a valid mongo id")
    .custom((value) =>
      SubCategoryModel.find({ _id: { $in: value } }).then((subCategories) => {
        if (subCategories.length < 1 || subCategories.length !== value.length) {
          return Promise.reject("subCategories not found");
        }
      })
    )
    .custom((value, { req }) =>
      SubCategoryModel.find({ category: req.body.category }).then(
        (subCategories) => {
          const subCategoriesIds: string[] = [];
          subCategories.forEach((subCategory) => {
            subCategoriesIds.push((subCategory._id as string).toString());
          });
          if (!value.every((val: string) => subCategoriesIds.includes(val))) {
            return Promise.reject(
              "subCategories must be a valid subCategory of the category"
            );
          }
        }
      )
    ),
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("brand must be a valid mongo id")
    .custom((value) =>
      BrandModel.findById(value).then((brand) => {
        if (!brand) return Promise.reject("brand not found");
      })
    ),
  check("ratings")
    .optional()
    .isNumeric()
    .withMessage("ratings must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("ratings must be between 1 and 5"),
  check("numReviews")
    .optional()
    .isNumeric()
    .withMessage("numReviews must be a number")
    .custom((value, { req }) => {
      if (value > req.body.sold) {
        throw new Error("numReviews must be less than or equal sold");
      }
      return true;
    }),
  validatorMiddleware,
];

const getProductValidator = [
  check("id").isMongoId().withMessage("id must be a valid mongo id"),
  validatorMiddleware,
];

const updateProductValidator = [
  check("id").isMongoId().withMessage("id must be a valid mongo id"),
  check("title").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];

const deleteProductValidator = [
  check("id").isMongoId().withMessage("id must be a valid mongo id"),
  validatorMiddleware,
];

export {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
};
