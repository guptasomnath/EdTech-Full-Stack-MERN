import React from "react";
import { calculateDuration } from "@/utils/overview.utils";
import { IUserEnrolledCourse } from "@/types/ProfileTypes";
import Image from "next/image";
import { hideDialog } from "@/Redux/slices/dialogSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface IProps {
  data : IUserEnrolledCourse
}


const UserEnrolledCourseList = ({ data } : IProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleListitemClick = () => {
    dispatch(hideDialog());
    router.push(`/watch/${data._id}`);
  }

  return (
    <li onClick={handleListitemClick} className="flex gap-2 mb-3 cursor-pointer">
      <Image className = "aspect-video w-32" src={data.thumbnail} alt="course-thumnail" height={100} width={100}/>
      <div>
        <h1 className="text-sm font-medium line-clamp-2">
          {data.title + " "}
        </h1>
        <label className="text-xs">{calculateDuration(data.duration)}</label>
      </div>
    </li>
  );
};

export default UserEnrolledCourseList;
