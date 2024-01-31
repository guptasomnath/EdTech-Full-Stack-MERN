import { API_BASE_URL } from "@/config/constant";
import { useQuery } from "@/hooks/useQuery";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";
import ShowErrorText from "../Shared/ShowErrorText";
import { IFilterResponse } from "@/types/CoursePageTypes";
import FilterContent from "./FilterContent";
import SpinnerLayout from "../Shared/SpinnerLayout";
import { oneTimeCache } from "@/utils/oneTimeCache";

const GET_FILTERS_API = `${API_BASE_URL}/course/filters`;
const CACHE_KEY_NAME = "filterOption";

const Filters = () => {
  const isCacheExist = oneTimeCache.has(CACHE_KEY_NAME);

  const { error, isLoading, response } = useQuery<
    ISuccessResponse<IFilterResponse[]>,
    IErrorResponse
  >(isCacheExist ? "" : GET_FILTERS_API);

  if (error) {
    return <ShowErrorText errorTxt={error.message} />;
  }

  if (!isCacheExist && response) {
    oneTimeCache.set(CACHE_KEY_NAME, response?.data);
  }

  return (
    <div className="w-96 slideInRight absolute right-0 h-screen bg-white shadow-2xl text-right border-l-2 z-10 sm:w-full">
      {isLoading ? (
        <SpinnerLayout layoutCss="w-full ml-1 mt-5" />
      ) : (
        <FilterContent
          response={
            isCacheExist ? oneTimeCache.get(CACHE_KEY_NAME) : response?.data
          }
        />
      )}
    </div>
  );
};

export default Filters;
