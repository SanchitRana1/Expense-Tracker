import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
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
    default:"income",
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
    maxLength: 50,
  }
},{
    timestamps:true
});

const Income = mongoose.model("Income", incomeSchema);

export default Income;
