import { hideDialog } from "@/Redux/slices/dialogSlice";
import { setFilters } from "@/Redux/slices/filterSlice";
import { filtersValue } from "@/config/filtersValue";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import FilterName from "./FilterName";
import { IFilterResponse } from "@/types/CoursePageTypes";

interface IProps {
  response: IFilterResponse[] | undefined;
}

const FilterContent = ({ response }: IProps) => {
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  const onCloseBtnClicked = () => {
    dispatch(hideDialog());
  };

  const clearFilterBtnClicked = () => {
    if (filtersValue.size !== 0) {
      filtersValue.forEach((value, key) => filtersValue.delete(key));
      dispatch(setFilters({}));
      setRender(!render);
    }
  };

  const onDoneBtnClick = async () => {
    dispatch(hideDialog());
    let filters: object = {};
    filtersValue.forEach((value, key) => {
      filters = {
        ...filters,
        [key]: value.optionQueryCode,
      };
    });
    const reqBody = {
      query: filters,
    };

    if (filtersValue.size !== 0) {
      dispatch(setFilters(reqBody));
    }
  };

  return (
    <>
      <div className="py-5 px-4 border-b flex justify-between">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={onCloseBtnClicked}
          size={20}
        />
        <button
          onClick={clearFilterBtnClicked}
          className="font-semibold cursor-pointer transition-all hover:text-gray-500"
        >
          Clear Filters
        </button>
      </div>
      {response?.map((value, index) => (
        <FilterName
          key={"FilterName" + index}
          name={value.filterName}
          render={render}
          optionList={response?.[index].filterOptionList}
        />
      ))}
      <button
        onClick={onDoneBtnClick}
        className="w-[50%] bg-blue-500 text-white py-2 rounded-lg mt-5 mr-3 hover:bg-blue-400 transition-all"
      >
        Done
      </button>
    </>
  );
};

export default FilterContent;
