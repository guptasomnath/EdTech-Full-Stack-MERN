import { AiFillStar } from "react-icons/ai";
import { GoDotFill } from 'react-icons/go';
import Link from "next/link";
import RatingList from "@/components/Ratings/RatingList";

const Review = () => {
  return (
    <div className='my-3'>
        <h1 className="font-semibold text-xl pb-3">Ratings</h1>
        <div className="flex items-center justify-between font-semibold">
           <div className="flex items-center">
              <AiFillStar color = 'orange' size = {20}/>
              <label className="pl-1 pr-2">4.7</label>
              <GoDotFill size = {13}/>
              <label className="pl-2">333K ratings</label>
            </div>

             <Link className="link-style" href='/ratings'>All Ratings</Link>
        </div>
        <RatingList />
    </div>
  )
}

export default Review