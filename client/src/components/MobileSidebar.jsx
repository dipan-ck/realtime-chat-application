import React from 'react';
import { X } from 'lucide-react';
import User from '../components/User'
import SearchComp from '../components/SearchComp'
import UserProfile from '../components/UserProfile'
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { Tooltip } from "react-tooltip";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MobileSidebar = ({ clickedUsers, setClickedUsers }) => {
  // const { users, getAllUsers } = useChatStore(); // Ensure users is defined here
  // const { onlineUsers } = useAuthStore();

  // useEffect(() => {
  //   getAllUsers();
  // }, [getAllUsers]);

  return (
    // <div className='bg-[#0b0b0b] h-[98%] flex flex-col justify-between w-[18rem] py-4 px-2'>
    //   <h3 className='text-white font-Inter font-semibold text-2xl tracking-tight'>Chatflow   <i className="ri-message-3-line text-[#8a75ff] text-2xl"></i></h3>
    //   <SearchComp />
    //   <div className='usersdiv flex flex-col gap-4  h-[67%] mb-4 mt-4 overflow-scroll'>
    //     {
    //       Array.isArray(users) ? 
    //       users.length > 0 ? (
    //         users.map((user, index) => {
    //           const isOnlione = onlineUsers.includes(user._id);
    //           return (
    //             <User key={index} status={isOnlione} id={user._id} name={user.fullName} profilePic={user.profilePic} />
    //           );
    //         })
    //       ) : (
    //         <p className='text-white'>No users available</p>
    //       ) : <p className='text-white'>No users available</p>
    //     }
    //   </div>
    //   <UserProfile />
    // </div>
    <>
    hi
    </>
  );
};

export default MobileSidebar;

