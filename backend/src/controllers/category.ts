import { Request, Response } from "express";
import { Category } from "../models/category";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({
        message: "Name is Required",
      });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      res.status(409).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
    });

    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating category",
      error,
    });
  }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating category",
      error,
    });
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting category",
      error,
    });
  }
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({});
    res.status(201).json({
      success: true,
      message: "All Categories Fetched Successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all categories",
      error,
    });
  }
};

export { createCategory, updateCategory, deleteCategory, getCategories };
