"use client";

import React, { useState } from "react";
import PaginationItems from "./PaginationItems";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

interface IPagination {
  totalPage: number;
}

const Pagination = ({ totalPage }: IPagination) => {
  const selectedPage = useSelector((state: RootState) => state.pagination);
  const createPaginationList = () => {
    const from = selectedPage < 5 ? 1 : selectedPage;
    let to = selectedPage + 5 - 1;
    if (selectedPage < 5) {
      if (totalPage < 5) {
        to = totalPage;
      } else {
        to = 5;
      }
    } else if (to > totalPage) {
      to = totalPage;
    }
    const array: number[] = [];
    for (let i = from; i <= to; i++) {
      array.push(i);
    }
    return array;
  };
  const [paginationList, setPaginationList] = useState(createPaginationList());

  const prevIconVisibility = paginationList[0] <= 1 ? "hidden" : "flex";
  const nextIconVisibility = paginationList[paginationList.length - 1] >= totalPage ? "hidden" : "flex";

  const handleNextPagination = () => {
    const loopStart = paginationList[4] + 1;
    let loopEnd = paginationList[4] + 5;
    if (loopEnd > totalPage) {
      loopEnd = totalPage;
    }
    const newList = [];
    for (let i = loopStart; i <= loopEnd; i++) {
      newList.push(i);
    }
    setPaginationList(newList);
  };

  const handlePreviousPagination = () => {
    const loopEnd = paginationList[0];
    if (loopEnd <= 1) return;
    const loopStart = loopEnd - 5;
    const newList = [];
    for (let i = loopStart < 1 ? 1 : loopStart; i < loopEnd; i++) {
      newList.push(i);
    }
    setPaginationList(newList);
  };

  return (
    <ul className="flex gap-2 items-center justify-center -space-x-px h-10 text-base pb-8 pt-8">
      <li
        onClick={handlePreviousPagination}
        className={`flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${prevIconVisibility}`}
      >
    
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </li>

      {paginationList.map((value, index) => {
        return <PaginationItems key={index} value={value} />;
      })}

      <li
        onClick={handleNextPagination}
        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${nextIconVisibility}`}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </li>
    </ul>
  );
};

export default React.memo(Pagination);
