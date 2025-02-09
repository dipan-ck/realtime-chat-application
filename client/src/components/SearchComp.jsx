import React from 'react'

function SearchComp() {
  return (
<div className="bg-[#181818] flex px-1 py-1 mt-8 rounded-full overflow-hidden max-w-md mx-auto ">
        <input type='email' placeholder='Search Something...' className="w-full outline-none bg-[#181818] pl-4 text-sm placeholder:text-[#838383] text-white " />
        <button type='button'
          className="bg-[#6a51f6]  transition-all text-white text-sm rounded-full px-5 py-2.5">Search</button>
      </div>
  )
}

export default SearchComp