import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

function User({ name, id,profilePic, status }) {


  
const {setSelectedUsertoChat} = useChatStore();


    const handleClick =()=>{
        setSelectedUsertoChat({
            name:name,
            profilePic:profilePic,
            _id:id,
            status: status
        });

        

    }

    return (

        <div onClick={handleClick} className=' cursor-pointer flex flex-row py- pb-3 items-center  gap-4 border-b-1 mx-2 border-[#171717]'>
            <img src="/05.png" alt="" srcset="" className='h-auto w-[50px]' />
            <div>
                <h2 className='text-white font-medium  text-md '>{name}</h2>
                <p className={`${status? "text-[#affe9f]": "text-[#8a8a8a]"} text-xs`}>{status?"Online":"Offline"}</p>
            </div>
        </div>
    )
}

export default User