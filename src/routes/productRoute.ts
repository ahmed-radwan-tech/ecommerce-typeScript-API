import { Router } from "express";
import {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/validators/productValidator";
import {
  getproducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const router: Router = Router();

router.route("/").get(getproducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
export default router;
