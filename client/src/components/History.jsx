import React from "react";

const History = ({ transactionHistory }) => {
  const [...history] = transactionHistory;
  return (
    <div className="flex flex-col gap-4 mb-8">
      <h2 className="text-3xl font-nunito font-semibold">Recent History</h2>
      {history?.map(item=> {
        const {_id, title, amount, type } = item;
        return <div key={_id} className="bg-[#fcf6f9] border-2 border-[white] shadow-md p-4 rounded-full flex justify-between items-center">
            <p className={`${type==="expense" ? "text-[red]" : "text-[green]"}`}>{title}</p>
            <p className={`${type==="expense" ? "text-[red]" : "text-[green]"}`}>{type==="expense" ?"-":""}{amount}</p>
        </div>
      })}
    </div>
  );
};

export default History;
