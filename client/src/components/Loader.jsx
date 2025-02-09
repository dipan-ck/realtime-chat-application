import React from 'react'

function Loader() {
    return (
<div className='w-[100vw] h-[100vh] bg-[#0c0c0c] bg-opacity-33 flex justify-center items-center'>

<div class="loader">
  <div class="loader__balls">
    <div class="loader__balls__group">
      <div class="ball item1"></div>
      <div class="ball item1"></div>
      <div class="ball item1"></div>
    </div>
    <div class="loader__balls__group">
      <div class="ball item2"></div>
      <div class="ball item2"></div>
      <div class="ball item2"></div>
    </div>
    <div class="loader__balls__group">
      <div class="ball item3"></div>
      <div class="ball item3"></div>
      <div class="ball item3"></div>
    </div>
  </div>
</div>

</div>
    )
}

export default Loader