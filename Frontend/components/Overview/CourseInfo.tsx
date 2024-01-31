import Link from "next/link";
import React from "react";
import {
  AiOutlineFundProjectionScreen,
} from "react-icons/ai";
import { HiGlobeAlt } from "react-icons/hi";
import { MdOndemandVideo } from "react-icons/md";

import { ICourseOverviewResponse } from "@/types/CourseOverviewTypes";
import { calculateDuration, calculatePrice } from "../../utils/overview.utils";
import StarRating from "../Ratings/StarRating";

interface ICourseInfoProps {
  data : ICourseOverviewResponse | undefined
}

const CourseInfo = ({ data } : ICourseInfoProps) => {
  return (
    <>
      <h1 className="text-2xl font-semibold pb-1">
        {data?.title}
      </h1>
      <p>{data?.shortDescription}</p>
      <div className="text-sm flex items-center mt-2">
        <MdOndemandVideo />
        <label className="pl-1">{calculateDuration(data?.duration)}</label>
      </div>

      <div className="text-sm flex items-center mt-2">
        <AiOutlineFundProjectionScreen />
        <label className="pl-1 font-medium">{data?.ratings}</label>
        <StarRating isEnable = {false} currentRatings={data?.ratings || 1}/>
        <label className="pl-1 pr-2">({data?.totalRatings} ratings)</label>
        <Link className="link-style" href={`/ratings/${data?._id}`}>
          View All
        </Link>
      </div>

      <div className="flex items-center gap-1 mt-1">
        <>
          <HiGlobeAlt size={15} /> <label>{data?.language}</label>
        </>
      </div>
      <h2 className="font-bold text-slate-700 mt-1">{calculatePrice(data?.price)}</h2>
    </>
  );
};

export default CourseInfo;
