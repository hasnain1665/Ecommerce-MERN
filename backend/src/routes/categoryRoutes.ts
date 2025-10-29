import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/authMiddleware";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController";

const router = Router();

router.post("/create", verifyJWT, isAdmin, createCategory);
router.put("/update/:id", verifyJWT, isAdmin, updateCategory);
router.delete("/delete/:id", verifyJWT, isAdmin, deleteCategory);
router.get("/get", verifyJWT, isAdmin, getCategories);

export default router;
