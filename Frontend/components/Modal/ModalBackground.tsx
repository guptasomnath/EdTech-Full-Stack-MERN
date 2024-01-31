"use client";
import { ReactNode, useEffect } from "react";
import ProfileDialog from "./ProfileDialog/ProfileDialog";
import RatingDialog from "./RatingDialog/RatingDialog";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import Filters from "../Courses/Filters";

const BlackBack = () => {
  const state = useSelector((state: RootState) => state.dialog);

  const componentsList = new Map<string, ReactNode>();
  componentsList.set("RatingDialog", <RatingDialog />);
  componentsList.set("UpdateRatingDialog", <RatingDialog isUserReviewExist = {true}/>);
  componentsList.set("ProfileDialog", <ProfileDialog />);
  componentsList.set("Filters", <Filters />);

  useEffect(() => {
    if(state.visibility == "hidden")
       document.body.style.overflowY = "auto";
    else
      document.body.style.overflowY = "hidden";
  }, [state]);

  return (
    <div
      className={`z-10 absolute h-screen w-full bg-[#00000040] ${state.visibility} items-center justify-center`}
    >
      {componentsList.get(state.componentName)}
    </div>
  );
};

export default BlackBack;
