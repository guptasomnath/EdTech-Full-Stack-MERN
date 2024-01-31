"use client"

import Link from "next/link";
import NavList from "./NavList";
import { useState } from "react";

interface NavbarProps {
  listColor : string
}

const Navbar = ({ listColor } : NavbarProps) => {
  const [mobileNavVisibility, setmobileNavVisibility] = useState<string>('hidden');

  const handleMobileMenuBtn = () => {
    setmobileNavVisibility('flex');
  }

  const handleMobileCloseMenuBtn = () => {
    setmobileNavVisibility('hidden');
  }

  return (
    <header className="w-full h-[10%] flex items-center justify-between box-border px-14 sm:px-0 relative bgtab:px-5">
      <div className="flex items-center sm:pl-3">
        <svg
          onClick={handleMobileMenuBtn}
          className={`hidden text-gray-600 sm:${mobileNavVisibility === 'hidden'? 'flex' : 'hidden'}`}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M80 160h352M80 256h352M80 352h352"
          />
        </svg>
        <svg
          onClick={handleMobileCloseMenuBtn}
          className={`hidden sm:${mobileNavVisibility === 'hidden'? 'hidden' : 'flex'}`}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m7 7l10 10M7 17L17 7"
          />
        </svg>
        
        <Link href="/">
          <h1 className="text-3xl font-bold cursor-pointer text-slate-700 sm:pl-4 sm:text-2xl">
            Moymath
          </h1>
        </Link>

      </div>
      <nav
        className={`sm:${mobileNavVisibility} sm:absolute sm:bg-white sm:top-[4.4rem] sm:w-full sm:px-4 sm:pb-7 sm:shadow-xl sm:z-10`}
      >
        <NavList listColor = {listColor} setmobileNavVisibility = {setmobileNavVisibility}/>
       
      </nav>
    </header>
  );
};

export default Navbar;
