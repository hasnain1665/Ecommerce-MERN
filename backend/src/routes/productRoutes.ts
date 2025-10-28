import { Router } from "express";
import { upload } from "../middlewares/multerMiddleware";
import { isAdmin, verifyJWT } from "../middlewares/authMiddleware";
import {
  createProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  getProducts,
} from "../controllers/productController";

const router = Router();

router.post(
  "/create-product",
  verifyJWT,
  isAdmin,
  upload.single("image"),
  createProduct
);
router.get("/all-products", getAllProducts);
router.get("/products", getProducts);
router.get("/get-product/:id", getSingleProduct);
router.put(
  "/update-product/:id",
  verifyJWT,
  isAdmin,
  upload.single("image"),
  updateProduct
);
router.delete("/delete-product/:id", verifyJWT, isAdmin, deleteProduct);

export default router;
