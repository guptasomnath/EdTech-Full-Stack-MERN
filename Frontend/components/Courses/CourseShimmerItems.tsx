import React from "react";

const CourseShimmerItems = () => {
  return (
    <li className="cursor-pointer h-[333px] w-[320px] border shadow flex flex-col sm:w-full sm:mx-5">
      <div className="aspect-video w-full bg-gray-100 overflow-hidden shimmerAnimation"></div>

      <div className="w-full aspect-video px-5 py-5 flex flex-col justify-between flex-grow">
        <div className="w-36 h-[1rem] bg-slate-100 shimmerAnimation"></div>
        <div>
          <div className="w-full h-[1rem] bg-slate-100 shimmerAnimation"></div>
          <div className="w-36 h-[1rem] bg-slate-100 mt-1 shimmerAnimation"></div>
        </div>
        <div className="w-28 h-[1rem] bg-slate-100 shimmerAnimation"></div>
      </div>
    </li>
  );
};

export default CourseShimmerItems;
