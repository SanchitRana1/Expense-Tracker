import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { dateFormat } from "../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const { incomes = [], expenses = [] } = useSelector((store) => store?.app);

  console.log(incomes, expenses);

  const dataInc = {
    labels: incomes.map((inc) => dateFormat(inc.date)).sort(),
    datasets: [
      {
        label: "Income",
        data: incomes?.map((inc) => inc.amount),
        backgroundColor: "green",
        tension:0.2
      }
    ],
  };
  const dataExp = {
    labels: expenses.map((inc) => dateFormat(inc.date)).sort(),
    datasets: [

      {
        label: "Expenses",
        data: expenses?.map((exp) => exp.amount),
        backgroundColor: "red",
        tension:0.2
      },
    ],
  };
  return (
    <div className="chart bg-[#fcf6f9] border-2 border-[white] shadow-lg p-4 rounded-lg h-auto mb-10">
      <Line data={dataInc} />
      <Line data={dataExp} />
    </div>
  );
};

export default Chart;
