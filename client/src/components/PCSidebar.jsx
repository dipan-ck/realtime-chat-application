import React, { useState, useEffect } from 'react'
import SearchComp from './SearchComp'
import UserProfile from './UserProfile'
import User from '../components/User'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'

function PCSidebar() {
   const { users, getAllUsers } = useChatStore();
   const { onlineUsers } = useAuthStore();

   useEffect(() => {
      getAllUsers();
   }, [getAllUsers]);



  return (
    <div className='bg-[#0b0b0b] h-[98%] flex flex-col justify-between w-[18rem] py-4 px-2'>

      <h3 className='text-white font-Inter font-semibold text-2xl tracking-tight'>Chatflow   <i className="ri-message-3-line text-[#8a75ff] text-2xl"></i></h3>

      <SearchComp />

      <div className='usersdiv flex flex-col gap-4  h-[67%] mb-4 mt-4 overflow-scroll'>
        {
          Array.isArray(users) ? 
          users.length > 0 ? (
            users.map((user, index) => {
              const isOnline = onlineUsers.includes(user._id);
              return (
                <User key={index} status={isOnline} id={user._id} name={user.fullName} profilePic={user.profilePic} />
              );
            })
          ) : (
            <p className='text-white'>No users available</p>
          ) : <p className='text-white'>No users available</p>
        }
      </div>

      <UserProfile />

    </div>
  )
}

export default PCSidebar