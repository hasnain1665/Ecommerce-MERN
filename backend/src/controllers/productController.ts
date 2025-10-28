import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { Category } from "../models/categoryModel";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, quantity } = req.body;

    if (!name) {
      res.status(400).send({ message: "Name is Required" });
    }

    if (!description) {
      res.status(400).send({ message: "Description is Required" });
    }

    if (!price) {
      res.status(400).send({ message: "Price is Required" });
    }

    if (!category) {
      res.status(400).send({ message: "Category is Required" });
    }

    if (!quantity) {
      res.status(400).send({ message: "Quantity is Required" });
    }

    const image = req.file?.path;

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      res.status(409).send({
        success: false,
        message: "Product is already created",
      });
    }

    const existingCategory = await Category.findOne({ name: category });

    const product = await Product.create({
      name,
      description,
      price,
      category: existingCategory?._id,
      quantity,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating product",
      error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({}).populate("category", "name");

    res.status(201).json({
      success: true,
      message: "Products Fetched Successfully",
      total: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all products",
      error,
    });
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = "10", page = "1" } = req.query;

    const pageLimit = Number(limit);
    const pageNumber = Number(page);

    const products = await Product.find({})
      .limit(pageLimit)
      .skip((pageNumber - 1) * pageLimit)
      .sort({ createdAt: -1 });

    const count = await Product.countDocuments();

    res.status(201).json({
      success: true,
      message: "Products Fetched Successfully",
      totalPages: Math.ceil(count / pageLimit),
      currentPage: pageNumber,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching products",
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category", "name");

    res.status(201).json({
      success: true,
      message: "Product Fetched Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching product",
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, quantity } = req.body;
    const { id } = req.params;
    const image = req.file?.path;

    const existingCategory = await Category.findOne({ name: category });

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category: existingCategory?._id,
        quantity,
        image,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Product Updated Successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating product",
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting product",
      error,
    });
  }
};

export {
  createProduct,
  getAllProducts,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
