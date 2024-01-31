"use client";
import { RootState } from "@/Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "@/Redux/slices/categorySlice";
import { setPagination } from "@/Redux/slices/paginationSlice";
import { setSearchText } from "@/Redux/slices/searchSlice";

interface FilterItemProps {
  name: string;
  index: number;
}

const Categorys = ({ name, index }: FilterItemProps) => {
  const { catClickIndex } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();

  const handleCatItemClick = () => {
    dispatch(setCategory({ catClickIndex: index, catName: name }));
    dispatch(setPagination(1));
    dispatch(setSearchText(null));
  };

  const selectedItemBgColor =
    index === catClickIndex
      ? "border-l-gray bg-green-100"
      : "border-l-white bg-white";
  return (
    <li
      onClick={handleCatItemClick}
      className={`w-full py-2 px-3 border-l-4 ${selectedItemBgColor} cursor-pointer whitespace-pre`}
    >
      {name}
    </li>
  );
};

export default Categorys;
