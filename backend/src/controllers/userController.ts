import { Request, Response } from "express";
import { User } from "../models/userModel";
import { comparePassword, hashPassword } from "../utils/authHelper";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname) {
      res.status(400).send({ message: "Full Name is Required" });
    }

    if (!email) {
      res.status(400).send({ message: "Email is Required" });
    }

    if (!password) {
      res.status(400).send({ message: "Password is Required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).send({
        success: false,
        message: "Already Registered, please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating user",
      error,
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is Required" });
    }

    if (!password) {
      res.status(400).send({ message: "Password is Required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(409).send({
        success: false,
        message: "No user registered with this email, please register",
      });
      return;
    }

    const matchPassword = await comparePassword(password, user.password);

    if (!matchPassword) {
      res.status(409).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Access Token
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenExpiry = Number(process.env.ACCESS_TOKEN_EXPIRY);

    if (!accessTokenSecretKey) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const accessToken = jwt.sign({ _id: user._id }, accessTokenSecretKey, {
      expiresIn: `${accessTokenExpiry}d` || "1d",
    });

    // Refresh Token
    const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenExpiry = Number(process.env.REFRESH_TOKEN_EXPIRY);

    if (!refreshTokenSecretKey) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const refreshToken = jwt.sign({ _id: user._id }, refreshTokenSecretKey, {
      expiresIn: `${refreshTokenExpiry}d` || "3d",
    });

    user.refreshToken = refreshToken;

    await user.save();

    const loggedInUser = await User.findById(user._id).select("-refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User Logged In Successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
      error,
    });
  }
};

const logoutUser = async (req: CustomRequest, res: Response) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { refreshToken: undefined },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User Logged Out Successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while logging out",
      error,
    });
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    console.log(incomingRefreshToken);

    if (!incomingRefreshToken) {
      res.status(401).send({
        message: "Unauthorized Request",
      });
    }

    const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET;

    if (!refreshTokenKey) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const newDecodedToken = jwt.verify(
      incomingRefreshToken,
      refreshTokenKey
    ) as CustomJwtPayload;
    console.log(newDecodedToken._id);

    const user = await User.findById(newDecodedToken._id);

    if (!user) {
      res.status(401).send({ message: "Invalid Refresh Token" });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      res.status(401).send({ message: "Refresh Token is Expired" });
    }

    // Access Token
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenExpiry = Number(process.env.ACCESS_TOKEN_EXPIRY);

    if (!accessTokenSecretKey) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const accessToken = jwt.sign({ _id: user?._id }, accessTokenSecretKey, {
      expiresIn: `${accessTokenExpiry}d` || "1d",
    });

    // Refresh Token
    const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenExpiry = Number(process.env.REFRESH_TOKEN_EXPIRY);

    if (!refreshTokenSecretKey) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const refreshToken = jwt.sign({ _id: user?._id }, accessTokenSecretKey, {
      expiresIn: `${refreshTokenExpiry}d` || "3d",
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access Token Refreshed Successfully",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while generating refresh token",
      error,
    });
  }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken };
