import mongoose, { Document, Model } from "mongoose";

export const pagination = async <T extends Document>(
  model: Model<T>,
  limit: string,
  page: string,
  categoryId?: mongoose.Types.ObjectId
) => {
  const pageLimit = Number(limit);
  const pageNumber = Number(page);

  return model
    .find({ category: categoryId })
    .populate("category", "name")
    .limit(pageLimit)
    .skip((pageNumber - 1) * pageLimit)
    .sort({ createdAt: -1 });
};
