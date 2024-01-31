
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IUserInfoResponse } from "@/types/ProfileTypes";
import { nameToAvaterText } from "@/utils/nameToAvaterText";
import LogoutBtn from "./LogoutBtn";

interface UserInfoDataType {
  userInfoData: IUserInfoResponse | undefined;
}

const UserInfo = ({ userInfoData }: UserInfoDataType) => {
  const nameAvatars = nameToAvaterText(userInfoData?.name);

  return (
    <div className="w-[30%] border-r-2 relative h-[90%] sm:w-full sm:flex sm:flex-col sm:items-center sm:h-auto">
      <div className="h-[120px] w-[120px] bg-[#fde130] text-4xl font-semibold flex items-center justify-center">
        {nameAvatars}
      </div>
      <div className="sm:text-center sm:w-full">
        <h1 className="text-lg font-medium text-slate-700">
          {userInfoData?.name}
        </h1>
        <div className="text-base line-clamp-none text-slate-700 flex items-center sm:w-full sm:justify-center gap-2">
          <span title={userInfoData?.email} className="truncate">{userInfoData?.email + " "}</span>
          <IoCheckmarkDoneCircle
          className = "mr-1 sm:mr-0"
            title="email verified"
            color={userInfoData?.isVerified ? "green" : "orange"}
            size={16}
          />
        </div>
      </div>
      <LogoutBtn />
    </div>
  );
};

export default UserInfo;
