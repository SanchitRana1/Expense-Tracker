import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Form from "./Form";
import {INCOME_URL } from "../utils/constants";
import { addIncomes } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import IncomeItem from "./IncomeItem";

const Incomes = ({getIncomes}) => {
  const isNonMobileDevice = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store?.user);
  const { totalIncome } = useSelector((store) => store?.app);
  const income = useSelector(store=>store?.app?.incomes)
  
  // const getIncomes = async () => {
  //   try {
  //     const response = await fetch(
  //       `${INCOME_URL}/get-incomes/${user?._id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const income = await response.json();
  //     dispatch(addIncomes(income?.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const deleteIncome = async (id) => {
    try {
      const response = await fetch(
        `${INCOME_URL}/delete-income/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const income = await response.json();
      if(income?.success){
        getIncomes();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getIncomes();
  }, [dispatch]);

  return (
    <div className="flex overflow-auto mx-4">
      <div className="w-[100%] py-8 px-6">
        <h1 className="text-5xl font-bold font-sans">Incomes</h1>
        <h2 className="flex justify-center items-center bg-[#fcf6f9] border-4 border-[white] shadow-sm rounded-xl py-4 my-8 text-center text-3xl font-nunito font-semibold gap-2">Total Income: 
          <span className="px-2 text-4xl text-[#25b025]">₹ {totalIncome}</span>
           </h2>
        <div className={`income-container w-full flex gap-8 ${isNonMobileDevice ? "flex-row":"flex-col"}`}>
          <div className="form-container py-4 basis-1/3 ">
            <Form getIncomes={getIncomes}/>
          </div>
          <div className="incomes basis-2/3 py-4">
            {income?.map((inc) => {
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
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incomes;
