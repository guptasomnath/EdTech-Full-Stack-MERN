import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "@/Redux/slices/dialogSlice";
import StarRating from "@/components/Ratings/StarRating";
import { useEffect, useRef, useState } from "react";
import { errorToast, successToast } from "@/components/Shared/Toast/Toastify";
import { getUserInfo } from "@/utils/processUserInfo";
import { API_BASE_URL } from "@/config/constant";
import SpinnerBtn from "@/components/Shared/SpinnerBtn";
import { calculateDate } from "@/utils/calculateDate";
import { oneTimeCache } from "@/utils/oneTimeCache";
import { fetchRatings } from "@/Redux/features/getRatingsSlice";
import { createRatingsUrl } from "@/utils/createRatingsUrl";
import { RootState } from "@/Redux/store";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";
import { doQuery } from "doquery";
import { usePathname } from "next/navigation";

const STORE_RATING_API = `${API_BASE_URL}/rating/add`;
const UPDATE_RATING_API = `${API_BASE_URL}/rating/update`;

const RatingDialog = ({
  isUserReviewExist,
}: {
  isUserReviewExist?: boolean;
}) => {
  const pathName = usePathname().split("/");
  const courseID = pathName[pathName.length - 1];
  const { _id, name, token } = getUserInfo();
  const pageNumber = useSelector((state : RootState) => state.pagination);

  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const [currentRatings, setCurrentRatings] = useState(3);

  const dispatch = useDispatch();
  const dispatchAction = useDispatch<any>();

  const handleDialogCloseBtn = () => {
    dispatch(hideDialog());
  };

  useEffect(() => {
    if (isUserReviewExist) {
      if (commentRef.current) {
        commentRef.current.value = oneTimeCache.get("userRatingDetails").message;
      }
      setCurrentRatings(oneTimeCache.get("userRatingDetails").stars);
    }
  }, []);

  const handleReviewSubmit = async () => {
    setSpinnerVisibility(true);

    const reqBodyForCreate = {
      userID: _id,
      courseID: courseID,
      userName: name,
      stars: currentRatings,
      message: commentRef.current?.value,
    };

    const reqBodyForUpdate = {
      ratingID: oneTimeCache.get("userRatingDetails")?._id,
      userID: _id,
      stars: currentRatings,
      message: commentRef.current?.value,
    };

    const reqHead = {
      Authorization: "Bearer " + token,
    };

    const { success, error, response } = await doQuery<ISuccessResponse, IErrorResponse>({
      method: isUserReviewExist ? "PUT" : "POST",
      url: isUserReviewExist ? UPDATE_RATING_API : STORE_RATING_API,
      header: reqHead,
      body: isUserReviewExist ? reqBodyForUpdate : reqBodyForCreate,
    });
    setSpinnerVisibility(false);
    if (!success) return errorToast(error?.message);

    successToast(response?.message);
    dispatch(hideDialog());
    const GET_RATINGS_URL = createRatingsUrl(pageNumber, courseID);
    dispatchAction(fetchRatings(GET_RATINGS_URL));
  };

  return (
    <div className="z-10 w-80 h-96 bg-white rounded-sm px-6 pb-4 flex flex-col items-center">
      <h1 className="w-full font-semibold text-gray-700 text-center border-b py-4 text-base">
        Give Review
      </h1>
      <Image
        className="mt-7"
        src="/userIcon.png"
        alt="user-icon"
        width={50}
        height={50}
      />
      <h2 className="font-semibold text-gray-600 mt-3">{name}</h2>
      <p className="text-xs text-gray-500 mb-4">
        Rate the care provided {calculateDate(new Date().toISOString())}
      </p>
      <StarRating
        isEnable={true}
        currentRatings={currentRatings}
        setCurrentRatings={setCurrentRatings}
      />
      <textarea
        ref={commentRef}
        className="w-full border px-3 py-2 text-sm mt-4 bg-lime-100"
        placeholder="Additional Comments..."
      ></textarea>
      <div className="flex w-full text-xs font-semibold gap-2 mt-4">
        <button
          onClick={handleDialogCloseBtn}
          className="flex-[50%] border py-2 transition-all hover:bg-red-200"
        >
          Not Now
        </button>
        <SpinnerBtn
          style="flex-[50%] py-2 bg-gray-500 text-white"
          onClick={handleReviewSubmit}
          spinnerVisibility={spinnerVisibility}
          text={isUserReviewExist ? "Update Review" : "Submit Review"}
        />
      </div>
    </div>
  );
};

export default RatingDialog;
