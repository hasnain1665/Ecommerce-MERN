import { Router } from "express";
import { upload } from "../middlewares/multer";
import { isAdmin, verifyJWT } from "../middlewares/auth";
import {
  createProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  getProducts,
} from "../controllers/product";

const router = Router();

router.post(
  "/create",
  verifyJWT,
  isAdmin,
  upload.single("image"),
  createProduct
);
router.get("/get-all", getAllProducts);
router.get("/products", getProducts);
router.get("/get-single/:id", getSingleProduct);
router.put(
  "/update/:id",
  verifyJWT,
  isAdmin,
  upload.single("image"),
  updateProduct
);
router.delete("/delete/:id", verifyJWT, isAdmin, deleteProduct);

export default router;
