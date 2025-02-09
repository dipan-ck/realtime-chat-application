
import React, { useState, useEffect } from 'react'
import SearchComp from './SearchComp'
import UserProfile from './UserProfile'
import User from '../components/User'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'


function PCSidebar() {
   const {users, getAllUsers} = useChatStore();
   const {onlineUsers} = useAuthStore();


   useEffect(() => {
      getAllUsers();
   }, [getAllUsers])
   

  return (
    <div className='bg-[#0b0b0b] h-[98%] flex flex-col justify-between w-[18rem] py-4 px-2'>

      <h3 className='text-white font-Inter font-semibold text-2xl tracking-tight'>Chatflow   <i className="ri-message-3-line text-[#8a75ff] text-2xl"></i></h3>

      <SearchComp />

      <div className='usersdiv flex flex-col gap-4  h-[67%] mb-4 mt-4 overflow-scroll'>

        {
          
          users && (  users.map((user, index) => {
            const isOnlione = onlineUsers.includes(user._id);
          return (
            <User key={index} status={isOnlione} id={user._id} name={user.fullName} profilePic={user.profilePic}  />
          )
        }))

        }

      </div>

      <UserProfile />

    </div>
  )
}

export default PCSidebar