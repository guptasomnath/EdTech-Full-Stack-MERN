"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import FilterOption from "./FilterOption";
import { filtersValue } from "@/config/filtersValue";
import { IFilterOption } from "@/types/CoursePageTypes";

interface Props {
  name: string;
  render: boolean;
  optionList: IFilterOption[] | null;
}

const FilterName = ({ name, render, optionList }: Props) => {
  const [childsVisibality, setChildVisibality] = useState(
    filtersValue.has(name.toLowerCase()) ? "block" : "hidden"
  );
  const [checkedItem, setCheckedItem] = useState(-1);

  useEffect(() => {
    setCheckedItem(-1);
  }, [render]);

  const dropDownIconVisibality =
    childsVisibality == "hidden" ? "block" : "hidden";

  const dropUpIconVisibality =
    childsVisibality == "hidden" ? "hidden" : "block";

  const onDopDownIconClicked = () => {
    setChildVisibality("block");
  };

  const onDropUpIconClicked = () => {
    setChildVisibality("hidden");
  };

  return (
    <>
      <div className="w-full border-b py-4">
        <label className="flex items-center justify-between px-6 font-semibold text-lg cursor-pointer">
          {name}
          <IoIosArrowDropdown
            className={dropDownIconVisibality}
            onClick={onDopDownIconClicked}
            size={20}
          />
          <IoIosArrowDropup
            className={dropUpIconVisibality}
            onClick={onDropUpIconClicked}
            size={20}
          />
        </label>
        {optionList?.map((value, index) => (
          <FilterOption
            key={"FilterOption" + index}
            visibality={childsVisibality}
            optionName={value.optionName}
            query={value.optionQueryCode}
            filterName={name}
            index={index}
            checkedItem={checkedItem}
            setCheckedItem={setCheckedItem}
          />
        ))}
      </div>
    </>
  );
};

export default FilterName;
