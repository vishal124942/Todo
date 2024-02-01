import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import jwt from "jsonwebtoken";
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email and Passoword",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    sendCookie(user, res, `Welcome back ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "User Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "User Created Successfully", 201);
  } catch (error) {
    next(error);
  }
};
export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      sucess: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Signout Successfully",
    });
};
