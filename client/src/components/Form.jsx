import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { plus } from "../utils/icons";
import { INCOME_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Form = ({getIncomes}) => {
  const { user, token } = useSelector((store) => store?.user);
  const userId = user?._id;
  const emptyForm = {
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
    userId,
  }
  const [form, setForm] = useState(emptyForm);
  const { title, amount, date, category, description } = form;

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${INCOME_URL}/add-income`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if(data.success){
        resetForm();
        getIncomes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <form onSubmit={onHandleSubmit} className="flex flex-col gap-6">
        <div className="">
          <input
          maxLength={50}
            className="py-2 px-4 rounded-md border-2 border-[white] w-[100%] outline-none"
            required
            type="text"
            value={title}
            name={"title"}
            placeholder="Salary"
            onChange={handleInput}
          />
        </div>
        <div className="">
          <input
            className="py-2 px-4 rounded-md border-2 border-[white] w-[100%] outline-none"
            required
            type="number"
            value={amount}
            name={"amount"}
            placeholder="Amount"
            onChange={handleInput}
          />
        </div>
        <div className="">
          <DatePicker
            className="py-2 px-4 rounded-md border-2 border-[white] outline-none"
            required
            id="date"
            placeholderText="Enter a Date"
            selected={date}
            dateFormat={"dd/MM/yyyy"}
            onChange={(date) => {
              setForm({ ...form, date: date });
            }}
          />
        </div>
        <div className="flex">
          <select
            className="py-2 px-4 rounded-md border-2 border-[white] w-[80%] focus:bg-[white] outline-none"
            required
            name={"category"}
            id=""
            value={category}
            onChange={handleInput}
          >
            <option disabled value="">
              Select Category
            </option>
            <option value={`salary`}>Salary</option>
            <option value={`freelancing`}>Freelancing</option>
            <option value={`investments`}>Investments</option>
            <option value={`stocks`}>Stocks</option>
            <option value={`bitcoins`}>Bitcoins</option>
            <option value={`bank`}>Bank</option>
            <option value={`youtube`}>Youtube</option>
            <option value={`other`}>Other</option>
          </select>
        </div>
        <div className="">
          <textarea
          maxLength={50}
            className="py-2 px-4 rounded-md border-2 border-[white] w-[100%] outline-none"
            required
            type="text"
            value={description}
            name={"description"}
            placeholder="description"
            onChange={handleInput}
          />
        </div>
        <div className="submit">
          <button className="bg-[#6464ff] hover:bg-[#5353d5] hover:shadow-lg  text-[white] px-8 py-2 rounded-md text-lg font-semibold">
            {plus} Add Income
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
