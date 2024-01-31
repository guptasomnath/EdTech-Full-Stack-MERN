"use client"

import Link from "next/link";
import {useState, useEffect} from "react";
import { usePathname } from "next/navigation";
import NavBtn from "./NavBtn";
import { Dispatch, SetStateAction } from "react";
import UserAccountBtn from "./UserAccountBtn";
import { isAuthenticated } from "@/utils/isAuthenticated";

interface NavListProps {
  listColor: string;
  setmobileNavVisibility : Dispatch<SetStateAction<string>>
}

interface NavOptionsType {
  name : string,
  path : string
}

const NavList = ({ listColor, setmobileNavVisibility }: NavListProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navOptions, setNavOptions] = useState<NavOptionsType[]>([
    {name : 'Home', path : '/'},
    {name : 'Course', path : '/courses'},
    {name : 'Login', path : '/login'}
  ])

  useEffect(()=>{

    if(isAuthenticated()){
      setNavOptions(navOptions.slice(0, 2));
      setIsLoggedIn(true);
    }
    
  },[])

  const path = usePathname();
  const handleNavItemClicked = () => {
    setmobileNavVisibility('hidden');
  }

  return (
    <ul className="flex items-center font-semibold gap-11 sm:flex-col sm:gap-4 sm:items-start">

      {
        navOptions.map((value, index) => {
          return (
            <li onClick={handleNavItemClicked} key={index} className={path == value.path ? `text-slate-400` : `text-[${listColor}]` + ` cursor-pointer transition-all hover:text-slate-400 sm:text-slate-800`}>
              <Link href={value.path}>{value.name}</Link>
            </li>
          )
        })
      }

      {isLoggedIn? <UserAccountBtn setmobileNavVisibility = {setmobileNavVisibility} /> : <NavBtn />}

    </ul>
  );
};

export default NavList;
