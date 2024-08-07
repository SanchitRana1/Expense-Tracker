import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import { useMediaQuery } from '@mui/material';
import Dashboard from '../components/Dashboard';
import Incomes from '../components/Incomes';
import Expenses from '../components/Expenses';
import { useDispatch, useSelector } from 'react-redux';
import { EXPENSE_URL, INCOME_URL } from '../utils/constants';
import { addExpenses, addIncomes } from '../utils/appSlice';

const Home = () => {
  const dispatch = useDispatch(); 
  const [active, setActive] = useState(1);
  const isNonMobileDevice = useMediaQuery("(min-width:1000px)");
  const User = useSelector((store)=>store?.user)

  const {user,token} = useSelector((store)=>store?.user)

  const getIncomes = async () => {
    try {
      const response = await fetch(
        `${INCOME_URL}/get-incomes/${user?._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const income = await response.json();
      dispatch(addIncomes(income?.data));
    } catch (error) {
      console.log(error);
    }
  };
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


  const displayData = ()=>{
    switch (active) {
      case 1: 
      return <Dashboard getIncomes={getIncomes} getExpenses={getExpenses}/>
      case 2: 
      return <Dashboard getIncomes={getIncomes}  getExpenses={getExpenses}/>
      case 3: 
      return <Incomes getIncomes={getIncomes} />
      case 4: 
      return <Expenses  getExpenses={getExpenses}/>
    
      default:
        return <Dashboard getIncomes={getIncomes} getExpenses={getExpenses}/>
    }
  }
  return (
    <div className={`p-8 flex gap-8 w-full min-h-[100vh] z-10 ${isNonMobileDevice ? "flex-row":"flex-col"}`}>
        <div className={`z-10 flex gap-4 ${!isNonMobileDevice && "mx-auto"}`}>
          <Navigation active={active} setActive={setActive} userData={User}/>
        </div>
        <main className="flex-1 bg-[#f2f2f2dd] border-4 border-[white] z-10 rounded-xl overflow-x-hidden">
          {displayData()}
        </main>
        {/* <p className="font-nunito text-black text-4xl">Khoya Khoya Chand</p> */}
        {/* <p className='font-eduAus'>Khoya Khoya Chand</p>
    <p className='font-[clamp(1rem, 1.5vw, 1.2rem)]'>Khoya Khoya Chand</p>
    <p className=''>Khoya Khoya Chand</p> */}
      </div>
  )
}

export default Home