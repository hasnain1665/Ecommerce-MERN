import { Document, Model } from "mongoose";

export const pagination = async <T extends Document>(
  model: Model<T>,
  limit: string,
  page: string
) => {
  const pageLimit = Number(limit);
  const pageNumber = Number(page);

  return model
    .find({})
    .limit(pageLimit)
    .skip((pageNumber - 1) * pageLimit)
    .sort({ createdAt: -1 });
};
