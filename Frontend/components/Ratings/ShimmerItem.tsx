import React from 'react'

const ShimmerItem = () => {
  return (
    <div className={`min-h-[14rem] w-96 sm:w-full border-2 px-4 py-4`}>
        <div className="flex justify-between">
            <div>
                {/* user name div */}
                <div className='w-40 h-[1.8rem] bg-slate-100 shimmerAnimation'></div>
                <div className="flex items-center text-sm font-semibold mt-2 gap-2">
                    <div className='w-32 h-[1rem] bg-slate-100 shimmerAnimation'></div>
                    <div className='w-24 h-[1rem] bg-slate-100 shimmerAnimation'></div>
                </div>
            </div>

            <div className="h-10 w-10 rounded-full bg-slate-100 shimmerAnimation"></div>
        </div>
        {/* message div */}
        <div className='w-full h-[1rem] bg-slate-100 shimmerAnimation mt-2'></div>
        <div className='w-full h-[1rem] bg-slate-100 shimmerAnimation mt-1'></div>
        <div className='w-60 h-[1rem] bg-slate-100 shimmerAnimation mt-1'></div>
    </div>
  )
}

export default ShimmerItem;