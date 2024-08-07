import React from "react";
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from "../utils/icons";
import { dateFormat } from "../utils/dateFormat.js";

const IncomeItem = ({
  id,title,amount,date,category,description,deleteItem,indicateColor,type,}) => {
  const categoryIcon = () => {
    switch (category) {
        case 'salary': return money;
        case 'freelancing': return freelance;
        case 'investments': return stocks;
        case 'stocks': return users;
        case 'bitcoins': return bitcoin;
        case 'bank': return card;
        case 'youtube': return yt;
        case 'other': return piggy;
        default:
            return "";
    }
  };
  const expenseCategoryIcon = () => {
    switch (category) {
        case 'education': return book;
        case 'groceries': return food;
        case 'health': return medical;
        case 'subscriptions': return tv;
        case 'takeways': return takeaway;
        case 'clothing': return clothing;
        case 'travelling': return freelance;
        case 'other': return circle;
        default:
            return "";
    }
  };
  return (
    <div className="flex items-center w-[100%] bg-[#fcf6f9] border-2 border-[white] shadow-2xl rounded-md p-4 mb-4 gap-2">
      <div className="flex items-center justify-center w-20 h-20 rounded-full`">
        {type === "expense" ? expenseCategoryIcon() : categoryIcon()}
      </div>
      <div className="content flex flex-col flex-1 gap-2">
        <h5 className="text-[1.3rem] ps-4 relative flex items-center">
          {" "}
          {indicateColor && (
            <div className="w-3 h-3 rounded-full mr-4 bg-[green]"></div>
          )}
          {title}
        </h5>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1 opacity-80">{dollar} {amount}</p>
            <p className="flex items-center gap-2 opacity-80">
              {calender} {dateFormat(date)}
            </p>
            <p className="flex items-center gap-2 opacity-80">
              {comment} {description}
            </p>
          </div>
          <div className="btnCon p-2 rounded-full w-10  flex justify-center cursor-pointer">
            <button onClick={()=>{deleteItem(id)}}>{trash}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeItem;
