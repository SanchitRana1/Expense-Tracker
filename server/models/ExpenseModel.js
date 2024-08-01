import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
    maxLength: 50,
  },
  type: {
    type: String,
    default:"expense",
  },
  date: {
    type: Date,
    required: true,
  },
  
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type:String,
    required:true,
    trim: true,
    maxLength: 20,
  }
},{
    timestamps:true
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
