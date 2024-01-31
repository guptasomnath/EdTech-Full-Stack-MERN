"use client";

import React, { useEffect } from "react";
import ReviewCard from "../../../components/Ratings/ReviewCard";
import Pagination from "@/components/Shared/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { setPagination } from "@/Redux/slices/paginationSlice";
import ShimmerLayout from "@/components/Ratings/ShimmerLayout";
import ShowErrorText from "@/components/Shared/ShowErrorText";
import AddRatingBtn from "@/components/Modal/RatingDialog/AddRatingBtn";
import { fetchRatings } from "@/Redux/features/getRatingsSlice";
import { createRatingsUrl } from "@/utils/createRatingsUrl";
import { usePathname } from "next/navigation";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { isUserEnrolled } from "@/utils/isUserEnrolled";

const Ratings = () => {
  const pageNumber = useSelector((state: RootState) => state.pagination);
  const pathName = usePathname().split("/");
  const courseID = pathName[pathName.length - 1];
  const isUserAlreadyEnrolled = isUserEnrolled(courseID);

  const dispatch = useDispatch();
  const dispatchAction = useDispatch<any>();

  const { isLoading, error, response } = useSelector(
    (state: RootState) => state.getRatings
  );

  useEffect(() => {
    dispatch(setPagination(1));
    const GET_RATINGS_URL = createRatingsUrl(pageNumber, courseID);
    dispatchAction(fetchRatings(GET_RATINGS_URL));
  }, []);

  if (error) {
    return <ShowErrorText errorTxt={error.message} />;
  }

  const isRatingsEmpty = response?.ratings.length === 0;

  const ratingBtnVisibility = isLoading || !isAuthenticated() || !isUserAlreadyEnrolled ? false : true;

  return (
    <div className="h-[90%] overflow-y-scroll w-full">
      <ul className="relative px-14 sm:px-4 py-8 w-full flex items-start content-start justify-center gap-4 flex-wrap">
        {isLoading ? (
          <ShimmerLayout />
        ) : isRatingsEmpty ? (
          <ShowErrorText errorTxt="No ratings avilable" />
        ) : (
          response?.ratings.map((value) => (
            <ReviewCard key={value._id} widthStyle="w-96" datas={value} />
          ))
        )}

        {ratingBtnVisibility ? <AddRatingBtn response={response} /> : null}
      </ul>

      {isLoading || isRatingsEmpty ? null : (
        <Pagination totalPage={response?.pages || 1} />
      )}
    </div>
  );
};

export default Ratings;
