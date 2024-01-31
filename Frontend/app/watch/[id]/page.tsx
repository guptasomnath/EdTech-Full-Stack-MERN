"use client";

import React from "react";
import Lessons from "../../../components/Watch/Lessons";
import { useQuery } from "@/hooks/useQuery";
import { API_BASE_URL } from "@/config/constant";
import { getUserInfo } from "@/utils/processUserInfo";
import { IVideosDetails } from "@/types/WatchTypes";
import { ICourseOverviewResponse } from "@/types/CourseOverviewTypes";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";
import ShowErrorText from "@/components/Shared/ShowErrorText";
import { oneTimeCache } from "@/utils/oneTimeCache";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { usePathname } from "next/navigation";
import LessonsShimmer from "@/components/Watch/LessonsShimmer";

interface IVideosResponse {
  videos: IVideosDetails[];
  videoAccessToken: string;
}

const Watch = () => {
  const pathName = usePathname().split("/");
  const courseID = pathName[pathName.length - 1];

  const { lessonID } = useSelector((state: RootState) => state.lesson);
  const { token } = getUserInfo();

  const reqHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const GET_VIDEO_LIST_URL = `${API_BASE_URL}/video/videos/${courseID}`;
  const COURSE_OVERVIEW_URL = `${API_BASE_URL}/course/course/${courseID}`;
  const isCourseInfoInCache = oneTimeCache.has("courseInfo");

  const { isLoading, error, response } = useQuery<
    [
      ISuccessResponse<IVideosResponse>,
      ISuccessResponse<ICourseOverviewResponse>
    ],
    [IErrorResponse, IErrorResponse]
  >(
    [GET_VIDEO_LIST_URL, isCourseInfoInCache ? "" : COURSE_OVERVIEW_URL],
    ["GET", "GET"],
    [reqHeader, undefined],
    [undefined, undefined],
    []
  );

  if (error?.[0]) {
    return <ShowErrorText errorTxt={error[0].message} />;
  }

  if (response?.[0].data.videos.length === 0) {
    return <ShowErrorText errorTxt="There is no video available" />;
  }

  let courseTitle = "";
  let courseDescription = "";
  if (isCourseInfoInCache) {
    const { title, shortDescription } = oneTimeCache.get("courseInfo");
    courseTitle = title;
    courseDescription = shortDescription;
  } else {
    courseTitle = response?.[1].data.title || "";
    courseDescription = response?.[1].data.shortDescription || "";
  }

  const videoUrl = `${API_BASE_URL}/video/stream/${
    lessonID || response?.[0].data.videos[0]._id
  }/${response?.[0].data.videoAccessToken}`;

  return (
    <section className="px-14 sm:px-3 bgtab:px-5 pt-4">
      <h1 className="text-2xl font-semibold">{courseTitle}</h1>
      <p className="text-gray-500">{courseDescription}</p>
      <div className="w-full h-full pt-3 flex items-start sm:flex-wrap">
        <div className="bg-[#cbd5e1] aspect-video w-[80%] sm:w-full">
          <video className="min-h-full min-w-full" src={videoUrl} controls />
        </div>
        {isLoading ? (
          <LessonsShimmer />
        ) : (
          <Lessons data={response?.[0].data.videos} />
        )}
      </div>
    </section>
  );
};

export default Watch;
