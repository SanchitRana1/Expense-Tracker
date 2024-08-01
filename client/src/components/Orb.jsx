import React from 'react'

const Orb = ({action}) => {
  return (
      // <div className={`w-[100vh] h-[100vh] absolute rounded-2xl bg-gradient-to-r from-[#f16891] to-blue-500 blur-[150px] ${action && "animate-[spin_10s_ease-in-out_2_0s] z-0"}`}></div>
      <div className={`w-full h-full fixed bg-gradient-to-br from-[#f16891] to-[#4f23b6] blur-sm`}></div>
  )
}

export default Orb