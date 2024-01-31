"use client";

import React from "react";
import SearchBox from "./SearchBox";
import { AiOutlineFilter } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { showDialog } from "@/Redux/slices/dialogSlice";

const CourseSearchFilterBar = () => {
  const dispatch = useDispatch();
  const onFilterBtnClicked = () => {
    dispatch(showDialog("Filters"));
  };

  return (
    <div className="w-full flex items-center relative">
      <SearchBox />
      <label
        onClick={onFilterBtnClicked}
        className="absolute top-2 right-0 font-semibold cursor-pointer flex items-center gap-1 sm:top-4"
      >
        <AiOutlineFilter /> Filter
      </label>
    </div>
  );
};

export default CourseSearchFilterBar;
