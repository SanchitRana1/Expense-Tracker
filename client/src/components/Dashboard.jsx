import React, { useEffect } from "react";
import Chart from "./Chart";
import { dollar } from "../utils/icons";
import { useSelector } from "react-redux";
import History from "./History";

const Dashboard = ({ getIncomes, getExpenses }) => {
  const { incomes, expenses, totalIncome, totalExpense } = useSelector(
    (store) => store?.app
  );
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    return history.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };
  
  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <div>
      <div className="py-8 px-6 w-full gap-2">
        <h1 className="text-3xl font-semibold">All Transactions</h1>
        <div className="stats-con flex w-[100%] my-4">
          <div className="basis-[60%] px-4">
            <Chart />
            <div className="amount-con flex flex-col">
              <div className="flex justify-around ">
                <div className="income items-center w-[40%] bg-[#fcf6f9] border-2 border-[white] shadow-xl rounded-xl p-4 mb-4 gap-2">
                  <h2 className="text-3xl font-nunito font-semibold">
                    Total Income
                  </h2>
                  <p className="font-semibold px-2 text-4xl text-[#25b025]">
                    {dollar} {totalIncome}
                  </p>
                </div>
                <div className="expense items-center w-[40%] bg-[#fcf6f9] border-2 border-[white] shadow-xl rounded-xl p-4 mb-4 gap-2">
                  <h2 className="text-3xl font-nunito font-semibold">
                    Total Expense
                  </h2>
                  <p className="font-semibold px-2 text-4xl text-[#ab2e2e]">
                    {dollar} {totalExpense}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center w-[60%] bg-[#fcf6f9] border-2 border-[white] shadow-xl rounded-xl p-4 gap-2 mx-auto">
                <h2 className="text-3xl font-nunito font-semibold">
                  Total Balance
                </h2>
                <p
                  className={`font-semibold px-2 text-4xl ${
                    totalIncome > totalExpense
                      ? "text-[#25b025]"
                      : "text-[#ab2e2e]"
                  }`}
                >
                  {dollar} {totalIncome - totalExpense}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con basis-[40%] px-4 ">
            <History transactionHistory={transactionHistory()} />
            <div className="flex flex-col gap-4 my-4">
              <h2 className="salary-title text-xl font-nunito font-semibold flex justify-between px-4">
                Min <span className="text-3xl">Salary</span> Max
              </h2>
              <div className="flex justify-between bprder-2 border-[white] bg-[#fcf6f9] shadow-xl rounded-2xl p-4 gap-2 ">
                <p className="text-xl">
                  {dollar} {Math.min(...incomes.map((item) => item.amount))}
                </p>
                <p className="text-xl">
                  {dollar} {Math.max(...incomes.map((item) => item.amount))}
                </p>
              </div>

              <h2 className="salary-title text-xl font-nunito font-semibold flex justify-between px-4">
                Min <span className="text-3xl">Expense</span> Max
              </h2>
              <div className="flex justify-between border-2 border-[white] bg-[#fcf6f9] shadow-xl rounded-2xl p-4 gap-2 ">
                <p className="text-xl">
                  {dollar} {Math.min(...expenses.map((item) => item.amount))}
                </p>
                <p className="text-xl">
                  {dollar} {Math.max(...expenses.map((item) => item.amount))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
