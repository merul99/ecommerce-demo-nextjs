import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <span class="relative flex h-7 w-7">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900"></span>
      </span>
    </div>
  )
}

export default Loader