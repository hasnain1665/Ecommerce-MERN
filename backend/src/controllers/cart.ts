import { Request, Response } from "express";
import { Cart } from "../models/cart";
import { Product } from "../models/product";

interface CustomRequest extends Request {
  user?: any;
}

const getTotalCount = async (userId: string) => {
  return await Cart.countDocuments({ userId });
};

const addToCart = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      const totalCount = await getTotalCount(userId);
      console.log("tt1", totalCount);

      res.status(200).json({
        success: true,
        message: "Product quantity updated",
        existingItem,
        totalCount,
      });
      return;
    }

    const newCartItem = await Cart.create({
      userId,
      productId,
      quantity,
    });

    const totalCount = await getTotalCount(userId);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      newCartItem,
      totalCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding product to cart",
      error,
    });
  }
};

const updateQuantity = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const existingItem = await Cart.findOne({ userId, productId });
    console.log(existingItem);

    if (!existingItem) {
      res.status(409).send({
        success: false,
        message: "No item found",
      });
      return;
    }

    existingItem.quantity = quantity;

    await existingItem.save();

    const totalCount = await getTotalCount(userId);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      existingItem,
      totalCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating quantity",
      error,
    });
  }
};

const removeItem = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    await Cart.findOneAndDelete({ userId, productId });

    const totalCount = await getTotalCount(userId);

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      totalCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while removing product",
      error,
    });
  }
};

const clearCart = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;

    await Cart.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      totalCount: 0,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while clearing cart",
      error,
    });
  }
};

const getAllItems = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;

    const allItems = await Cart.find({ userId });
    const productIds = allItems.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const totalCount = await getTotalCount(userId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      productIds,
      totalCount,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting all products",
      error,
    });
  }
};

export { addToCart, updateQuantity, removeItem, clearCart, getAllItems };
