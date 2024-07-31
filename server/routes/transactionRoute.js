import express from "express";
import Income from "../models/IncomeModel.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Helloworld");
});

router.route("/add-income").post(async (req, res) => {
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

    const income = await Income.create({
      title,
      amount,
      category,
      date: new Date(date),
      description,
    });
    res
      .status(201)
      .json({ success: true, data: income, message: "Income Added!" });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});

router.route("/get-incomes").get(async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });

    res.status(201).json({ success: true, data: incomes });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});

router.route("/delete-income/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    await Income.findByIdAndDelete(id);
    res
      .status(201)
      .json({ success: true, message: "Income Deleted Successfully!" });
  } catch (error) {
    res.status(501).json({ success: false, message: error });
  }
});
export default router;
