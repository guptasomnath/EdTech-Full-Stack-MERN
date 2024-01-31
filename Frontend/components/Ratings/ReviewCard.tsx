import StarRating from "./StarRating";
import { RatingsResponse } from "@/types/RatingTypes";
import { calculateDate } from "../../utils/calculateDate";
import { useState } from "react";

interface ReviewCardProps {
  widthStyle : string;
  datas : RatingsResponse
}

const ReviewCard = ({ widthStyle, datas } : ReviewCardProps) => {

  const ratingUpdateDate = calculateDate(datas.updatedAt);
  const [currentRatings, setCurrentRating] = useState(datas.stars);
  const [isCardCollapse, setIsCardCollapse] = useState(true);
  const totalMsgLength = datas.message.length - 1;

  const handleShowMoreBtn = () => {
    setIsCardCollapse(!isCardCollapse);
  }

  return (
    <li className={`${isCardCollapse? "h-[10rem]" : "h-auto"} ${widthStyle} sm:w-full border-2 px-4 py-4`}>
        <div className="flex justify-between">
            <div>
                <h1 className="font-bold text-lag mb-1">{datas.userName}</h1>
                <div className="flex items-center text-sm font-semibold">
                <StarRating isEnable = {false} currentRatings = {currentRatings} setCurrentRatings = {setCurrentRating} />
                <label className="ml-2">{ratingUpdateDate}</label>
                </div>
            </div>

            <div className="flex items-center cursor-pointer justify-center font-semibold text-xl w-10 h-10 bg-slate-300 pb-[0.20rem] text-gray-600 rounded-full">
              {datas.userName.slice(0, 1).toUpperCase()}
            </div>
        </div>
        <span className="pt-2">{datas.message.slice(0, isCardCollapse ? 120 : totalMsgLength)}</span>{totalMsgLength < 120 ? null : <span onClick={handleShowMoreBtn} className="pl-2 text-sm text-blue-600 cursor-pointer">{isCardCollapse ? "Show more.." : "Show less.."}</span>}
    </li>
  )
}

export default ReviewCard;