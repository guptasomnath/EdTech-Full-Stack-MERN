"use client"

import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPagination } from "@/Redux/slices/paginationSlice";

interface PaginationItemsProps {
    value : number;
}

const PaginationItems = ({ value } : PaginationItemsProps) => {
  const currentPage = useSelector((state : RootState) => state.pagination);
  const dispatch = useDispatch();

  const onAnyPageClick = () => {
    dispatch(setPagination(value));
  }

  return (
    <li onClick={onAnyPageClick}>
      <button className={`rounded-full flex items-center justify-center px-4 h-10 leading-tight ${currentPage == value ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>{value}</button>
    </li>
  )
}

export default PaginationItems