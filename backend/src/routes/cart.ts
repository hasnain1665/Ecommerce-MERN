import { Router } from "express";
import { verifyJWT } from "../middlewares/auth";
import {
  addToCart,
  clearCart,
  getAllItems,
  removeItem,
  updateQuantity,
} from "../controllers/cart";

const router = Router();

router.post("/add", verifyJWT, addToCart);
router.put("/update-cart", verifyJWT, updateQuantity);
router.delete("/remove-item", verifyJWT, removeItem);
router.delete("/clear-cart", verifyJWT, clearCart);
router.get("/get-all", verifyJWT, getAllItems);

export default router;
