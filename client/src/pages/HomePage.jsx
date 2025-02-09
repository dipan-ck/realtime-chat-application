
import WelcomeHome from '../components/WelcomeHome'
import ChatUi from '../components/ChatUi'

import ChatInput from '../components/ChatInput'
import PCSidebar from '../components/PCSidebar'
import MobileSidebar from '../components/MobileSidebar'
import { useState, useEffect } from 'react'
import { SidebarOpen, UserSearch } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore'

function HomePage() {

  const [clickedUsers, setClickedUsers] = useState(false);
  const { setIsSidebarOpen, isSidebarOpen } = useAuthStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 837px)');

    const handleMediaQueryChange = (event) => {
      setIsSidebarOpen(event.matches);
      console.log('Sidebar open:', event.matches);
    };

    // Set the initial state based on the current screen size
    handleMediaQueryChange(mediaQuery);

    // Add the event listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup function to remove the event listener
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [setIsSidebarOpen]);

  return (
   
    <>
    <MobileSidebar clickedUsers={clickedUsers} setClickedUsers={setClickedUsers}/>  
    <div className='bg-[#0b0b0b] w-[100vw] h-[100vh] relative flex flex-row justify-evenly items-center'>

      {!isSidebarOpen && (     <div  onClick={() => {
        setClickedUsers(!clickedUsers)

      }} className={`${clickedUsers? "hidden": "flex"}  absolute cursor-pointer z-30  p-2 rounded-md bg-[#8a75ff] top-[76%] left-4 `}>
        <UserSearch className='text-white' />
      </div>)} 


      { isSidebarOpen &&  <PCSidebar/>}
   


      <div className=' w-[100%] h-[100%] px-2  md:p-0 rounded-none md:w-[76%] md:h-[95%] relative bg-[#121212] md:rounded-3xl flex justify-center items-center'>

        <ChatUi/>


      </div>
    </div>
    </>
  )
}

export default HomePage