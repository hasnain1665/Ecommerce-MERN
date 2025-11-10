import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category";

const router = Router();

router.post("/create", verifyJWT, isAdmin, createCategory);
router.put("/update/:id", verifyJWT, isAdmin, updateCategory);
router.delete("/delete/:id", verifyJWT, isAdmin, deleteCategory);
router.get("/get", getCategories);

export default router;
