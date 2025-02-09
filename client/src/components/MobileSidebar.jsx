import React from 'react';
import { X } from 'lucide-react';
import User from '../components/User'
import SearchComp from '../components/SearchComp'
import UserProfile from '../components/UserProfile'
import { useAuthStore } from '../store/useAuthStore';
import { Tooltip } from "react-tooltip";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MobileSidebar = ({ clickedUsers, setClickedUsers }) => {





  // const navigate = useNavigate()

  // const { logout } = useAuthStore();

  // const handleLogout = () => {
  //   logout();
  // }
  // return (

  //   <div className={` ${clickedUsers ? "w-[100vw]" : "w-[0vw]"} transition-all ease-in-out h-[100vh] absolute background-transparent bg-[#0b0b0b]  overflow-hidden  top-0 flex flex-col justify-evenly items-center z-20 `}>


  //     <div className='bg-[#0b0b0b] h-[98%] w-[100%] py-4 px-2'>

  //       <h3 className='text-white font-Inter font-semibold text-2xl tracking-tight'>Chatflow   <i className="ri-message-3-line text-[#8a75ff] text-2xl"></i></h3>

  //       <div className="bg-[#181818] flex px-1 py-1 mt-4 rounded-full overflow-hidden max-w-md mx-auto ">
  //         <input type='email' placeholder='Search Something...' className="w-full outline-none bg-[#181818] pl-4 text-sm placeholder:text-[#838383] text-white " />
  //         <button type='button'
  //           className="bg-[#6a51f6]  transition-all text-white text-sm rounded-full px-5 py-2.5">Search</button>
  //       </div>

  //       <div className='usersdiv flex flex-col gap-4  h-[66%] mb-4 mt-4 overflow-scroll'>
          
  //       {
          
  //         allUsers && (  allUsers.map((user) => {
  //           return (
  //             <User onClick={()=>{    
  //             }} key={user._id} name={user.fullName} />
  //           )
  //         }))
  
  //         }

  //       </div>

  //       <div className='flex flex-row justify-between overflow-hidden  gap-2 items-center'>
  //         <div onClick={() => navigate("/profile")} className=' border-1 bg-[#141414] hover:bg-[#232323] cursor-pointer w-[75%] border-[#303030] rounded-full  flex flex-row py-2 pl-2  items-center gap-2'>
  //           <div className=' rounded-full overflow-hidden w-8 h-8'>
  //             <img src={authUser.profilePic} alt="" className='h-full w-full object-cover' />
  //           </div>

  //           <div className='overflow-hidden'>
  //             <h2 className='text-white whitespace-nowrap text-sm font-bold sm:text-base '>{authUser.fullName}</h2>
  //             <p className='text-[#a9a9a9] text-xs'>View Profile</p>

  //           </div>

  //         </div>

  //         <i data-tooltip-id="logout-tooltip" onClick={handleLogout} className="ri-logout-circle-line  bg-[#141414] hover:bg-[#292929] cursor-pointer py-3 px-3 rounded-lg text-[#ce6262] text-xl"></i>
  //         <Tooltip id="logout-tooltip" place="top" effect="solid">
  //           Logout
  //         </Tooltip>
  //       </div>

  //     </div>

  //   </div>
  // );
};

export default MobileSidebar;

