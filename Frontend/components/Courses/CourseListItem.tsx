import React from "react";
import Image from "next/image";
import { ICourseData } from "@/types/CoursePageTypes";
import { calculateDate } from "../../utils/calculateDate";
import Link from "next/link";

interface ICourseItems {
  datas: ICourseData;
}

const CourseListItem = ({ datas }: ICourseItems) => {
  const coursePublicDate: string = calculateDate(datas.createdAt);

  return (
    <Link
      href={`/overview/${datas._id}`}
      className="cursor-pointer h-[333px] w-[320px] border shadow flex flex-col sm:w-full sm:mx-2"
    >
      <div className="aspect-video w-full bg-gray-300 overflow-hidden">
        <Image
          src={datas.thumbnail}
          alt="listImage"
          height={100}
          width={100}
          className="w-full h-full"
        />
      </div>

      <div className="w-full aspect-video px-5 py-5 flex flex-col justify-between flex-grow">
        <p className="text-sm">{datas.categoryName}</p>
        <h2 className="font-semibold text-lg">
          {datas.title.substring(0, 52)}
        </h2>

        {/* <!-- Footer options --> */}
        <div className="flex items-center justify-between">
          <div className="w-full flex items-center gap-2">
            <Image src="/date.svg" height={16} width={16} alt="date-image" />
            <span className="text-sm font-medium text-slate-700">
              {coursePublicDate}
            </span>
          </div>

          <span className="font-semibold text-slate-900">
            {datas.price > 0 ? "Paid" : "Free"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseListItem;
