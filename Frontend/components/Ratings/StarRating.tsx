import React, { Dispatch, SetStateAction } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Props {
  isEnable: boolean;
  currentRatings : number;
  setCurrentRatings? : Dispatch<SetStateAction<number>>
}

const StarRating = ({ isEnable, currentRatings, setCurrentRatings}: Props) => {
  const numbeArray = Array.from({ length: 5 });

  const onStarClicked = (index: number) => {
    if (!isEnable) return;
    if(setCurrentRatings){
      setCurrentRatings(index + 1);
    }

  };

  const cursorClass = isEnable ? "cursor-pointer" : "";
  const ratings = Math.floor(currentRatings);
  return (
    <div className="flex">
      {numbeArray?.map((value, index) => {
        if (index < ratings)
          return (
            <AiFillStar
              className={cursorClass}
              key={index}
              onClick={() => onStarClicked(index)}
              color="orange"
              size={isEnable? 18 : 14}
            />
          );
        return (
          <AiOutlineStar
            className={cursorClass}
            key={index}
            onClick={() => onStarClicked(index)}
            size={isEnable? 18 : 13}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
