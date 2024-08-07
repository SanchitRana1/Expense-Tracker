import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { EXPENSE_URL } from "../utils/constants";
import { addExpenses } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import IncomeItem from "./IncomeItem";
import ExpenseForm from "./ExpenseForm";

const Expenses = () => {
  const isNonMobileDevice = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store?.user);
  const { totalExpense } = useSelector((store) => store?.app);
  const expense = useSelector(store=>store?.app?.expenses)
  
  const getExpenses = async () => {
    try {
      const response = await fetch(
        `${EXPENSE_URL}/get-expenses/${user?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const expense = await response.json();
      dispatch(addExpenses(expense?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(
        `${EXPENSE_URL}/delete-expense/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const expense = await response.json();
      if(expense?.success){
        getExpenses();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      getExpenses();

  }, [dispatch]);

  return (
    <div className="flex overflow-auto mx-4">
      <div className="w-[100%] py-8 px-6">
        <h1 className="text-5xl font-bold font-sans">Expenses</h1>
        <h2 className="flex justify-center items-center bg-[#fcf6f9] border-4 border-[white] shadow-sm rounded-xl py-4 my-8 text-center text-3xl font-nunito font-semibold gap-2">Total Expense: 
          <span className="px-2 text-4xl text-[#ab2e2e]">₹ {totalExpense}</span>
           </h2>
        <div className={`w-full flex gap-8 ${isNonMobileDevice ? "flex-row":"flex-col"}`}>
          <div className="form-container py-4 basis-1/3 ">
            <ExpenseForm getExpenses={getExpenses}/>
          </div>
          <div className=" basis-2/3 py-4">
            {expense?.map((inc) => {
              return (
                <IncomeItem
                indicateColor
                  key={inc?._id}
                  id={inc?._id}
                  title={inc?.title}
                  amount={inc?.amount}
                  date={inc?.date}
                  category={inc?.category}
                  description={inc?.description}
                  type={inc?.type}
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
