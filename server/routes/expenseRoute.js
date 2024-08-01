import express from "express";
import Expense from "../models/ExpenseModel.js";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/UserModel.js";
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Helloworld");
});

router.route("/add-expense").post(verifyToken, async (req, res) => {
  try {
    const { userId, title, amount, category, date, description } = req.body;
    const parsedAmount = Number(amount);
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
    } else {
      //  validations
      if (!title || !amount || !category || !date || !description) {
        res
          .status(400)
          .json({ success: false, message: "All fields are required!" });
      }
      if (amount <= 0 || typeof amount !== "number") {
        res
          .status(400)
          .json({ success: false, message: "Amount must be positive!" });
      }

      const expense = await Expense.create({
        userId,
        title,
        amount: parsedAmount,
        category,
        date,
        description,
      });
      res
        .status(201)
        .json({ success: true, data: expense, message: "Expense Added!" });
    }
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});

router.route("/get-expenses/:userId").get(verifyToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });

    res.status(201).json({ success: true, data: expenses });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});

router.route("/delete-expense/:id").delete(verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res
      .status(201)
      .json({ success: true, message: "Expense Deleted Successfully!" });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});
export default router;
