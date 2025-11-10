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
    const { productId, cartQuantity } = req.body;

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.cartQuantity += cartQuantity;
      await existingItem.save();
      const totalCount = await getTotalCount(userId);

      res.status(200).json({
        success: true,
        message: "Product quantity updated",
        totalCount,
      });
      return;
    }

    const newCartItem = await Cart.create({
      userId,
      productId,
      cartQuantity,
    });

    const totalCount = await getTotalCount(userId);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
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
    const { productId, cartQuantity } = req.body;

    const existingItem = await Cart.findOne({ userId, productId }).populate(
      "productId",
      "name image price quantity"
    );

    if (!existingItem) {
      res.status(409).send({
        success: false,
        message: "No item found",
      });
      return;
    }

    existingItem.cartQuantity = cartQuantity;

    await existingItem.save();

    const totalCount = await getTotalCount(userId);

    const Item = {
      product: existingItem.productId,
      cartQuantity: existingItem.cartQuantity,
      _id: existingItem._id,
    };

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      Item,
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

    const allItemIds = await Cart.find({ userId }).populate(
      "productId",
      "name image price quantity"
    );

    const allItems = allItemIds.map((item) => ({
      product: item.productId,
      cartQuantity: item.cartQuantity,
      _id: item._id,
    }));

    const totalCount = await getTotalCount(userId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      totalCount,
      allItems,
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
