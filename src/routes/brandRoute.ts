import { Router } from "express";
import {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validators/brandValidator";
import {
  createBrand,
  deleteBrand,
  getBrands,
  getBrandById,
  updateBrand,
} from "../services/brandService";

const router: Router = Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);
export default router;
