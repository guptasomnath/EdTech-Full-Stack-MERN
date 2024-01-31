import { MdOndemandVideo } from "react-icons/md";
import LessonList from "./LessonListItem";
import { IVideosDetails } from "@/types/WatchTypes";
import { calculateDuration } from "../../utils/overview.utils";

interface LessonsProps {
  data : IVideosDetails[] | undefined
}

const Lessons = ({data} : LessonsProps) => {

  let totalLessonTime = 0;
  data?.forEach((value) => {
    totalLessonTime += parseInt(value.duration);
  })

  return (
    <div className="pl-5 w-full h-[500px] sm:pl-0 sm:px-2 sm:mt-5">
      
      <label className="flex items-center gap-2 font-semibold sm:px-2">
        <MdOndemandVideo />
        {data?.length} Lessons ( {calculateDuration(totalLessonTime.toString())})
      </label>

      <ul className="w-full">
        {
          data?.map((value, index) => {
            return <LessonList key={value._id} position={index} info = {value} />
          })
        }
      </ul>
    </div>
  );
};

export default Lessons;
