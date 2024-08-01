import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const appSlice = createSlice({
  name: "app",
  initialState: {
    incomes: [],
    expenses: [],
    pieces: [],
    totalIncome: 0,
    totalExpense: 0,
  },
  reducers: {
    addIncomes: (state, action) => {
      state.incomes = action.payload;
      state.totalIncome= state.incomes.reduce((acc, curr) => acc += curr?.amount, 0);
    },

    addExpenses: (state, action) => {
      state.expenses = action.payload;
      state.totalExpense= state.expenses.reduce((acc, curr) => acc += curr?.amount, 0);
    },

    removeData: (state) => {
      state.incomes = [];
      state.expenses = [];
    },
  },
});

export const { addExpenses, addIncomes, removeData } = appSlice.actions;
export default appSlice.reducer;
