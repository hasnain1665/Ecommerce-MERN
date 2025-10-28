import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/authMiddleware";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController";

const router = Router();

router.post("/create-category", verifyJWT, isAdmin, createCategory);
router.put("/update-category/:id", verifyJWT, isAdmin, updateCategory);
router.delete("/delete-category/:id", verifyJWT, isAdmin, deleteCategory);
router.get("/get-categories", verifyJWT, isAdmin, getCategories);

export default router;
