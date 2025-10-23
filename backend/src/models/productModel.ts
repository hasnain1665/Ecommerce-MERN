import mongoose from "mongoose";

interface Product {
  name: string;
  description: string;
  price: Number;
  category: string;
  quantity: Number;
  image: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new mongoose.Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
