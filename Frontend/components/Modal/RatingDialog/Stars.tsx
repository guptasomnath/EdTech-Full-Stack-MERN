import React from "react";
import { AiFillStar } from "react-icons/ai";

const Stars = () => {
  return (
    <div className="flex gap-1">
      <AiFillStar color = 'orange' size = {20}/>
      <AiFillStar color = 'orange' size = {20}/>
      <AiFillStar color = 'orange' size = {20}/>
      <AiFillStar color = 'orange' size = {20}/>
      <AiFillStar color = 'gray' size = {20}/>
    </div>
  );
};

export default Stars;
