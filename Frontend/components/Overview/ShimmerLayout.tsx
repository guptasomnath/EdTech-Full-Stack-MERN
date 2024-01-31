import React from 'react'

const ShimmerLayout = () => {
  return (
    <>
    
      <div className="aspect-video bg-slate-10 w-1/2 sm:w-full shimmerAnimation"></div>
      <div className="w-1/2 px-5 sm:w-full sm:px-0 sm:pt-3 sm:flex-none">
            <div className='w-full h-[1.5rem] mt-2 bg-slate-100 shimmerAnimation'></div>
            <div className='w-[90%] h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>
            <div className='w-[45%] h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>
            <div className='w-[42%] h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>
            <div className='w-[20%] h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>
            <div className='w-[16%] h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>
            <div className="w-full rounded-md py-5 mt-5 bg-slate-100 shimmerAnimation sm:w-full"></div>
       </div>
       <div className='w-36 h-[1.5rem] mt-5 bg-slate-100 shimmerAnimation'></div>
       <div className='w-full h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>
       <div className='w-full h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>
       <div className='w-full h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>
       <div className='w-[90%] h-[1rem] mt-2 bg-slate-100 shimmerAnimation'></div>

    </>
  )
}

export default ShimmerLayout