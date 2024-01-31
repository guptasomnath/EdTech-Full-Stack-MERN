"use client"

import React from 'react';
import Spinner from './Spinner';

interface SpinnerBtnProps {
    text : string;
    onClick : React.MouseEventHandler<HTMLButtonElement> | undefined;
    spinnerVisibility : boolean;
    style? : string
}

const DEFAULT_STYLE = "w-full flex items-center h-[2.6rem] justify-center bg-[#883cfe] text-white font-semibold text-sm py-3 mt-3 rounded-md transition-all hover:bg-[#9a5bf8] sm:mb-16"

const SpinnerBtn = ({ text, onClick, spinnerVisibility, style } : SpinnerBtnProps) => {
  return (
    <button
        onClick={onClick}
        className = {style || DEFAULT_STYLE}
      >
        {spinnerVisibility? "" : text}
        <Spinner cssClass = {spinnerVisibility? "block" : "hidden"}/>
    </button>
  )
}

export default SpinnerBtn