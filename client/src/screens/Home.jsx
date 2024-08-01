import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import { useMediaQuery } from '@mui/material';
import Dashboard from '../components/Dashboard';
import Incomes from '../components/Incomes';
import Expenses from '../components/Expenses';
import { useSelector } from 'react-redux';

const Home = () => {
    
  const [active, setActive] = useState(1);
  const isNonMobileDevice = useMediaQuery("(min-width:1000px)");
  const User = useSelector((store)=>store?.user)


  const displayData = ()=>{
    switch (active) {
      case 1: 
      return <Dashboard/>
      case 2: 
      return <Dashboard/>
      case 3: 
      return <Incomes/>
      case 4: 
      return <Expenses/>
    
      default:
        return <Dashboard/>
    }
  }
  return (
    <div className={`p-8 flex gap-8 w-full min-h-[100vh] z-10 ${isNonMobileDevice ? "flex-row":"flex-col"}`}>
        <div className={`z-10 flex gap-4 ${!isNonMobileDevice && "mx-auto"}`}>
          <Navigation active={active} setActive={setActive} userData={User}/>
        </div>
        <main className="flex-1 bg-[#f2f2f2dd] border-4 border-[white] z-10 rounded-xl overflow-auto overflow-x-hidden">
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