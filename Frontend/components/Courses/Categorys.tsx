"use client";

import CategoryItems from "./CategoryItems";
import CatagoryShimmerLayout from "./CatagoryShimmerLayout";
import { API_BASE_URL } from "@/config/constant";
import ShowErrorText from "../Shared/ShowErrorText";
import { useQuery } from "@/hooks/useQuery";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";

interface ICategorys {
  _id: string;
  categoryName: string;
}

const CAT_API_URL = `${API_BASE_URL}/categorys/`;

const Catagorys = () => {
  const { isLoading, error, response } = useQuery<
    ISuccessResponse<ICategorys[]>,
    IErrorResponse
  >(CAT_API_URL);

  const categorys = [{ _id: "allcourses", categoryName: "All Courses" }];

  if (response?.data) {
    categorys.push(...response.data);
  }

  return (
    <ul className="sticky h-[90%] sm:h-auto w-[220px] overflow-y-scroll top-3 flex border-r pr-2 sm:border-none sm:pr-0 scrollbar-hide flex-col sm:flex-row sm:w-full sm:overflow-x-scroll items-start gap-3 text-sm font-medium sm:static sm:top-0 bgtab:w-[250px]">
      {isLoading ? (
        <CatagoryShimmerLayout />
      ) : error ? (
        <ShowErrorText errorTxt={error.message} />
      ) : (
        categorys.map((value, index) => (
          <CategoryItems key={index} name={value.categoryName} index={index} />
        ))
      )}
    </ul>
  );
};

export default Catagorys;
