import express from "express";
import Income from "../models/IncomeModel.js";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/UserModel.js";

// import { v2 as cloudinary } from "cloudinary";

// import dotenv from "dotenv"
// dotenv.config(); // access .env file

// // Uploading images to cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Helloworld");
});

router.route("/add-income").post(verifyToken, async (req, res) => {
  try {
    const { userId, title, amount, category, date, description } = req.body;
    const parsedAmount = Number(amount);

    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
    } else {
      //  validations
      if (!title || !parsedAmount || !category || !date || !description) {
        res
          .status(400)
          .json({ success: false, message: "All fields are required!" });
      } else if (parsedAmount <= 0 || typeof parsedAmount !== "number") {
        res
          .status(400)
          .json({ success: false, message: "Amount must be positive!" });
      } else {
        const income = await Income.create({
          userId,
          title,
          amount: parsedAmount,
          category,
          date,
          description,
        });
        res
          .status(201)
          .json({ success: true, data: income, message: "Income Added!" });
      }
    }
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});

router.route("/get-incomes/:userId").get(verifyToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const incomes = await Income.find({ userId }).sort({ createdAt: -1 });

    res.status(201).json({ success: true, data: incomes });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});

router.route("/delete-income/:id").delete(verifyToken,async (req, res) => {
  try {
    const {id} = req.params;
    await Income.findByIdAndDelete(id);
    res
      .status(201)
      .json({ success: true, message: "Income Deleted Successfully!" });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});
export default router;
