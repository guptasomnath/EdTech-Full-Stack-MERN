import UserEnrolledCourses from "./UserEnrolledCourses";
import DialogCloseBtn from "./DialogCloseBtn";
import UserInfo from "./UserInfo";
import { API_BASE_URL } from "@/config/constant";
import { IUserInfoResponse } from "@/types/ProfileTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useQuery } from "@/hooks/useQuery";
import { getUserInfo } from "@/utils/processUserInfo";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";
import SpinnerLayout from "@/components/Shared/SpinnerLayout";
import ShowErrorText from "@/components/Shared/ShowErrorText";
import LogoutBtn from "./LogoutBtn";

const GET_USER_INFO_API = `${API_BASE_URL}/users/profile/`;

const ProfileDialog = () => {
  const { _id: userID, token } = getUserInfo();
  const reqHead = { Authorization: "Bearer " + token };
  const { isLoading, error, response } = useQuery<
    ISuccessResponse<IUserInfoResponse>,
    IErrorResponse
  >(GET_USER_INFO_API + userID, "GET", reqHead);

  const dialog = useSelector((state: RootState) => state.dialog);

  const DialogContent = (
    <div className="flex sm:flex-wrap w-full gap-4 h-full">
      <UserInfo userInfoData={response?.data} />
      <UserEnrolledCourses userCoursesInfo={response?.data?.coursesDetails} />
    </div>
  );

  return (
    <div className="w-[700px] relative sm:w-full sm:mx-1 h-[26rem] bg-slate-100 pl-5 py-4 overflow-hidden sm:overflow-scroll sm:h-[28rem]">
      <DialogCloseBtn />
      {isLoading ? (
        <SpinnerLayout layoutCss="w-full" />
      ) : !error ? (
        DialogContent
      ) : (
        <>
          <ShowErrorText errorTxt={error.message} />
          <div className="absolute top-0 bottom-10">
           <LogoutBtn />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDialog;
