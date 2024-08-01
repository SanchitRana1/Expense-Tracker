import React from "react";
import { menuItems } from "../utils/menuItems";
import { signout } from "../utils/icons";
import { useDispatch } from "react-redux";
import { removeData } from "../utils/appSlice";
import { removeUser } from "../utils/userSlice";

const Navigation = ({active, setActive, userData}) => {
  const {user, token} = userData;
  const dispatch = useDispatch()
  const onSignOut=()=>{
    dispatch(removeData());
    dispatch(removeUser());
  }

  return (
    <div className={`py-8 px-6 flex flex-col justify-between h-full rounded-xl gap-8 bg-[#f2f2f2dd] border-4 border-[white] w-72`}>
      <div className="flex gap-1 items-center h-24">
        <img
          className="w-20 h-20 object-contain rounded-full p-1 bg-[#fcf6f9] shadow-lg"
          src={user?.profilePicture}
          alt="user"
        />
        <div className="p-2">
          <h2 className="font-bold text-xl">{user?.name}</h2>
          <p className="text-[#838383]">your Money</p>
        </div>
      </div>
      <ul className="flex flex-col flex-1 text-[#404040dc]">
        {menuItems.map((item) => {
          return (
            <li className={`grid grid-cols-5 cursor-pointer items-center relative px-2 py-1 transform transition-all ${active===item?.id ? "absolute border-l-4 border-[#404040] rounded-r-lg bg-white font-semibold text-[black]" :""}`} key={item?.id} onClick={()=>{setActive(item?.id)}}>
              {item?.icon}
              <span className="col-span-4">{item?.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="text-[#404040] cursor-pointer">
        <p className="" onClick={onSignOut}>{signout} Sign Out</p>
      </div>
    </div>
  );
};

export default Navigation;
