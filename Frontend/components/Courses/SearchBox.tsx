"use client";

import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "@/Redux/slices/searchSlice";
import { errorToast } from "../Shared/Toast/Toastify";
import { RootState } from "@/Redux/store";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state: RootState) => state.search);
  const searchInput = useRef<any>(null);

  useEffect(() => {
    if (!searchText) {
      searchInput.current.value = null;
    }
  }, [searchText]);

  const handleSearchBtnClick = () => {
    const text = searchInput.current?.value || null;
    if (text?.trim() === "" || !text)
      return errorToast("Enter some text for search");

    dispatch(setSearchText(text));
  };

  return (
    <>
      <div
        className={`flex items-center justify-center w-full gap-3 mb-5 sm:mt-14`}
      >
        <div className="w-[375px] shadow-sm border px-3 py-2 sm:mx-3 flex items-center relative">
          <input
            ref={searchInput}
            className="w-full outline-none pr-8"
            placeholder="Search.."
          />
          <button
            onClick={handleSearchBtnClick}
            className="cursor-pointer h-full w-10 bg-[#f4f4f4] absolute right-0 flex items-center justify-center"
          >
            <svg
              className="text-[#1A6573]"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
