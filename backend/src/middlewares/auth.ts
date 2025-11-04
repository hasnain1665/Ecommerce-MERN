import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";

interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

interface CustomRequest extends Request {
  user?: any;
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).send({ message: "Unauthorized Access" });
    }

    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecretKey) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const decodedToken = jwt.verify(
      token,
      accessTokenSecretKey
    ) as CustomJwtPayload;

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      res.status(400).send({ message: "User not found" });
    }

    (req as CustomRequest).user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);
    if (user?.role !== "Admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
