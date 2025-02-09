import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Tooltip } from "react-tooltip";
import { useNavigate } from 'react-router-dom';

function UserProfile() {

  const { authUser } = useAuthStore();



  const navigate = useNavigate()

  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  }
  return (
    <div className='flex flex-row justify-between gap-2 items-center px-0 '>
      <div onClick={() => navigate("/profile")} className=' border-1 bg-[#141414] hover:bg-[#232323] cursor-pointer w-[83%] border-[#303030] rounded-full top-0 flex flex-row py-2 pl-2 pr-2 items-center gap-4'>
      <div className=' rounded-full overflow-hidden w-9 h-9'>
  <img src={authUser.profilePic} alt="" className='h-full w-full object-cover' />
</div>

        <div>
          <h2 className='text-white whitespace-nowrap font-bold text-md '>{authUser.fullName}</h2>
          <p className='text-[#a9a9a9] text-xs'>View Profile</p>

        </div>

      </div>

      <i data-tooltip-id="logout-tooltip" onClick={handleLogout} className="ri-logout-circle-line  bg-[#141414] hover:bg-[#292929] cursor-pointer py-4 px-4 rounded-lg text-[#ce6262] text-xl"></i>
      <Tooltip id="logout-tooltip" place="top" effect="solid">
        Logout
      </Tooltip>
    </div>
  )
}

export default UserProfile