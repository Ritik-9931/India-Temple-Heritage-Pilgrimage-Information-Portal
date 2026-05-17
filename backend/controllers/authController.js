import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import generateToken from "../utils/generateToken.js"

/* =========================
   GENERATE JWT TOKEN
========================= */

// const generateToken = (id) => {
//   return jwt.sign(
//     { id },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "30d",
//     }
//   );
// };

/* =========================
   REGISTER USER
========================= */

export const registerUser = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      res.status(400);

      throw new Error(
        "User already exists"
      );
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   LOGIN USER
========================= */

export const loginUser = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      res.status(401);

      throw new Error(
        "Invalid email or password"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      res.status(401);

      throw new Error(
        "Invalid email or password"
      );
    }

    res.json({
      success: true,

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET USER PROFILE
========================= */

export const getUserProfile = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {
      res.status(404);

      throw new Error(
        "User not found"
      );
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};