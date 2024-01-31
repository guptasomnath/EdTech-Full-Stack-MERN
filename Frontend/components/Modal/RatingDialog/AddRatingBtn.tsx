import { showDialog } from "@/Redux/slices/dialogSlice";
import { oneTimeCache } from "@/utils/oneTimeCache";
import { RatingsResponse } from "@/types/RatingTypes";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

interface IRatingsResponse {
  userRatingDetails: RatingsResponse | null;
  ratings: RatingsResponse[];
  pages: number;
}

interface IProps {
  response: IRatingsResponse | undefined;
}

const AddRatingBtn = ({ response }: IProps) => {
  const dispatch = useDispatch();
  const showEnterRateDialog = () => {
    if (response?.userRatingDetails?._id) {
      oneTimeCache.set("userRatingDetails", response?.userRatingDetails);
      dispatch(showDialog("UpdateRatingDialog"));
      return;
    }
    dispatch(showDialog("RatingDialog"));
  };

  return (
    <button
      onClick={showEnterRateDialog}
      className="fixed right-14 bottom-5 bg-[#FEC9F1] rounded-full font-semibold flex items-center border px-4 hover:bg-[#f8d2ef] py-2 gap-2 sm:right-5 sm:bottom-16"
    >
      <BsStarFill />
      {response?.userRatingDetails ? "Edit Review" : "Give Review"}
    </button>
  );
};

export default AddRatingBtn;
