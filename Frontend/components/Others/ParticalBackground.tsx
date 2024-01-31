import React from "react";

const ParticalBackground = () => {
  return (
    <div className="absolute -z-10 w-1/2 h-full right-0 bg-[#3C5060] sm:hidden">
      <svg
        className="opacity-10 w-96"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#9EF0F0"
          d="M23.5,-26.4C32.1,-20.8,41.9,-14.9,47.8,-4.9C53.7,5.1,55.8,19.3,51.1,31.5C46.4,43.7,34.9,53.9,24.3,51.1C13.6,48.2,3.9,32.2,-2.6,22.9C-9,13.7,-12.2,11.3,-20.7,6.9C-29.2,2.6,-43,-3.7,-42.7,-7.9C-42.4,-12.1,-28,-14.2,-18.6,-19.7C-9.1,-25.1,-4.5,-34,1.4,-35.7C7.4,-37.4,14.9,-32,23.5,-26.4Z"
          transform="translate(100 100)"
        />
      </svg>
      <div className="h-44 w-48"></div>
    </div>
  );
};

export default ParticalBackground;
