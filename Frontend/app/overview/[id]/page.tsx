"use client";

import ShimmerLayout from "@/components/Overview/ShimmerLayout";
import { API_BASE_URL } from "@/config/constant";
import { ICourseOverviewResponse } from "@/types/CourseOverviewTypes";
import OverviewDetailsLayout from "@/components/Overview/OverviewDetailsLayout";
import ShowErrorText from "@/components/Shared/ShowErrorText";
import { useQuery } from "@/hooks/useQuery";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";
import { usePathname, useSearchParams } from "next/navigation";

const COURSE_OVERVIEW_URL = `${API_BASE_URL}/course/course/`;

const Overview = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname().split("/");
  const courseID = pathName[pathName.length - 1];

  const { isLoading, error, response } = useQuery<
    ISuccessResponse<ICourseOverviewResponse>,
    IErrorResponse
  >(COURSE_OVERVIEW_URL + courseID);

  if (error) {
    return <ShowErrorText errorTxt={error.message} />;
  }

  return (
    <>
      <section className="h-screen pt-3 sm:pt-0">
        {/* upper layout */}
        <div className="flex flex-wrap sm:flex-none items-start px-14 sm:px-4 bgtab:px-5">
          {isLoading ? (
            <ShimmerLayout />
          ) : (
            <OverviewDetailsLayout
              courseOverview={response?.data}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Overview;
