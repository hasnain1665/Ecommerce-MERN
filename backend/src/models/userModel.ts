import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  fullname: string;
  password: string;
  refreshToken: string;
  role: "Admin" | "User";
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
