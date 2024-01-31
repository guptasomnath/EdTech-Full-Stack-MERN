import { IVideosDetails } from "@/types/WatchTypes";
import { ImPause } from "react-icons/im";
import { ImPlay2 } from "react-icons/im";
import { calculateDuration } from "../../utils/overview.utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { setLessonState } from "@/Redux/slices/lessonSlice";

interface LessonListProps {
  position: number;
  info: IVideosDetails;
}

const LessonListItem = ({ position, info }: LessonListProps) => {
  const videoTime = calculateDuration(info.duration);
  const { index } = useSelector((state: RootState) => state.lesson);
  const dispatch = useDispatch();
  const handleLessonItemClick = () => {
    dispatch(
      setLessonState({
        index: position,
        lessonID: info._id,
      })
    );
  };
  return (
    <li
      onClick={handleLessonItemClick}
      className={`cursor-pointer ${
        position === index ? "bg-slate-200" : "bg-transparent"
      } p-3 font-medium mt-2`}
    >
      <div className="flex items-center gap-3">
        {position === index ? <ImPause /> : <ImPlay2 />}
        <div>
          <h3 className="font-bold">{info.title}</h3>
          <p className="text-sm">{videoTime}</p>
        </div>
      </div>
    </li>
  );
};

export default LessonListItem;
