import express from "express";
import Expense from "../models/ExpenseModel.js";
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Helloworld");
});

router.route("/add-expense").post(async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;
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
      title,
      amount,
      category,
      date: new Date(date),
      description,
    });
    res
      .status(201)
      .json({ success: true, data: expense, message: "Expense Added!" });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});

router.route("/get-expenses").get(async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });

    res.status(201).json({ success: true, data: expenses });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});

router.route("/delete-expense/:id").delete(async (req, res) => {
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
