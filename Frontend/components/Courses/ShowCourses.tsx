"use client";

import CourseList from "./CourseListItem";
import Pagination from "../Shared/Pagination/Pagination";
import CourseShimmerLayout from "./CourseShimmerLayout";
import ShowErrorText from "../Shared/ShowErrorText";
import { ICourseData } from "@/types/CoursePageTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { createCourseUrl } from "../../utils/createCourseUrl";
import { useQuery } from "@/hooks/useQuery";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";

interface IResponseData {
  courses: ICourseData[];
  pages: number;
}

const ShowCourses = () => {
  const { catName } = useSelector((state: RootState) => state.category);
  const pageNumber = useSelector((state: RootState) => state.pagination);
  const searchText = useSelector((state: RootState) => state.search);
  const filterQuery = useSelector((state: RootState) => state.filter);

  const reqBody = filterQuery;
  const { url, reqMethod } = createCourseUrl(
    pageNumber,
    catName,
    searchText,
    filterQuery
  );
  const { isLoading, error, response } = useQuery<
    ISuccessResponse<IResponseData>,
    IErrorResponse
  >(url, reqMethod, {}, reqBody, [url, filterQuery]);

  if (error) {
    return <ShowErrorText errorTxt={error.message} />;
  }

  if (response?.data.courses?.length === 0) {
    return <ShowErrorText errorTxt={"No course Avilable"} />;
  }

  return (
    <>
      <ul className="w-full flex justify-center gap-8 flex-wrap">
        {isLoading ? (
          <CourseShimmerLayout />
        ) : (
          response?.data.courses.map((value) => (
            <CourseList key={value._id} datas={value} />
          ))
        )}
      </ul>
      {isLoading ? null : (
        <Pagination totalPage={response?.data.pages || 1} />
      )}
    </>
  );
};

export default ShowCourses;
