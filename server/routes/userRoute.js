import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config(); // access .env file

// Uploading images to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
router.route("/register").post(async (req, res) => {
  try {
    const { name, email, password, profilePicture } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const photoURL = await cloudinary.uploader.upload(profilePicture);
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      profilePicture:photoURL?.url
    });

    if (newUser) {
      res.status(201).json({ success: true, data: newUser });
    }
  } catch (error) {
    res.status(501).json({ success: false, message: error?.message });
  }
});

//LOGIN
router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    const hashPassword = user?.password;
    if (user) {
      bcrypt.compare(password, hashPassword, (err, result) => {
        if (err) {
          res.status(400).json("Error comparing passwords");
        }
        if (result) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          // Passwords match, authentication successful
          res.status(201).json({
            success: true,
            data: { user, token },
          });
        } else {
          // Passwords don't match, authentication failed
          res.status(400).json({
            success: false,
            message: "Invalid credentials.",
          });
        }
      });
    } else {
      res
        .status(400)
        .json({ message: "User does not exists !", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

export default router;
