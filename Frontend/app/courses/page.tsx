"use client";

import React from "react";
import Categorys from "@/components/Courses/Categorys";
import ShowCourses from "@/components/Courses/ShowCourses";
import CourseSearchFilterBar from "@/components/Courses/CourseSearchFilterBar";

const Courses = () => {
  return (
    <section className="w-full h-[90%] overflow-y-scroll relative flex items-start sm:flex-wrap pt-8 px-14 sm:px-3 bgtab:px-5">
      <Categorys />
      <div className="w-full h-full">
        <CourseSearchFilterBar />
        <ShowCourses />
      </div>
    </section>
  );
};

export default Courses;
