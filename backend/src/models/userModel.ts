import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
  ADMIN = "Admin",
  USER = "User",
}

export interface IUser extends Document {
  email: string;
  fullname: string;
  password: string;
  refreshToken: string;
  role: UserRole.ADMIN | UserRole.USER;
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
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.USER],
      default: UserRole.USER,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
