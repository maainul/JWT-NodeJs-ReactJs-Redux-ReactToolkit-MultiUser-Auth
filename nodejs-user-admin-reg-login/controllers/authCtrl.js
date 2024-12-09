import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCtrl = async (req, res) => {
  const { email, password, username, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Username,email and password are required",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const salt = await bcrypt.genSalt();
    const trimmedPassword = password.trim();
    const hashPass = await bcrypt.hash(trimmedPassword, salt);
    const newuser = new userModel({
      username,
      email,
      password: hashPass,
      role,
    });
    await newuser.save();

    const payload = {
      username: newuser.username,
      email: newuser.email,
      role: newuser.role,
    };
    const token = jwt.sign(payload, "665c0c24a840bf62e76354cd", {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: payload,
      token,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const loginCtrl = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      success: false,
      message: "Please enter email and password",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const trimmedPassword = password.trim();
    const isPasswordValid = await bcrypt.compare(
      trimmedPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentails",
      });
    }

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, "665c0c24a840bf62e76354cd", {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "Login successful",
      data: payload,
      token,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

export const logoutCtrl = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Logout success",
      error: error.message,
    });
  }
};
