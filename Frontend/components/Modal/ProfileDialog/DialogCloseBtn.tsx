import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { hideDialog } from "@/Redux/slices/dialogSlice";

const DialogCloseBtn = () => {
  const dispatch = useDispatch();
  const onDialogCloseBtnClick = () => {
    dispatch(hideDialog());
  };
  return (
    <div className="w-full flex items-center justify-end pr-5">
      <button onClick={onDialogCloseBtnClick}>
        <AiOutlineClose
          className="text-slate-600 cursor-pointer transition-all hover:text-slate-500 hover:border-2 hover:rounded-full"
          size={20}
        />
      </button>
    </div>
  );
};

export default DialogCloseBtn;
