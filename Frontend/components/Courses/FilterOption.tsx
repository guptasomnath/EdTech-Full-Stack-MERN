"use client";

import { ChangeEvent } from "react";
import { filtersValue } from "@/config/filtersValue";

interface Props {
  visibality: string;
  optionName: string;
  filterName: string;
  index: number;
  query: object | string;
  checkedItem: number;
  setCheckedItem: React.Dispatch<React.SetStateAction<number>>;
}

const FilterOption = ({
  visibality,
  optionName,
  query,
  filterName,
  index,
  checkedItem,
  setCheckedItem,
}: Props) => {
  
  const fildName = filterName.toLowerCase();

  let inputChecked = filtersValue.get(fildName)?.optionName === optionName ? true : false;

  const onCheckBoxChanged = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      setCheckedItem(index);
      filtersValue.set(fildName, {
        optionName: optionName,
        optionQueryCode: query,
      });

      return;
    }

    setCheckedItem(-1);
  };
  return (
    <div className={`px-8 pt-1 ${visibality}`}>
      <div className="flex items-center gap-2 font-medium">
        <input
          checked={inputChecked}
          onChange={onCheckBoxChanged}
          className="cursor-pointer"
          type="checkbox"
          name={filterName}
        />
        {optionName}
      </div>
    </div>
  );
};

export default FilterOption;
