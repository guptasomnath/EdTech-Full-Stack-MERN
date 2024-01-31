import React from "react";
import UserEnrolledCourseList from "./UserEnrolledCourseList";
import ShowErrorText from "@/components/Shared/ShowErrorText";
import { IUserEnrolledCourse } from "@/types/ProfileTypes";

interface IProps {
  userCoursesInfo: IUserEnrolledCourse[] | undefined;
}

const UserEnrolledCourses = ({ userCoursesInfo }: IProps) => {

  return (
    <div className="w-full">
      <h1 className="font-semibold text-slate-600 underline underline-offset-2">
        Enrolled Courses
      </h1>

      {userCoursesInfo?.length === 0? <ShowErrorText errorTxt="No Data Found"/> : null}

      <ul className="mt-2 h-full overflow-y-scroll pb-8 sm:overflow-y-hidden sm:pb-0">
        {userCoursesInfo?.map((eachCourseInfo) => (
          <UserEnrolledCourseList key={eachCourseInfo._id} data={eachCourseInfo} />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(UserEnrolledCourses);
