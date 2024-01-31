"use client"

import React, { Dispatch, SetStateAction } from "react";

interface CatItemProps {
    item : string,
    index : number,
    state : number,
    setState : Dispatch<SetStateAction<number>>
}

const TabItems = (props : CatItemProps) => {
  const handleListClick = (index : number) => {
    props.setState(index);
  }

  return (
    <li onClick={() => handleListClick(props.index)} className={`cursor-pointer ${props.state === props.index? "underline decoration-rose-600 text-[#9e9ea0]" : ""}`}>
      {props.item}
    </li>
  )
}

export default TabItems;