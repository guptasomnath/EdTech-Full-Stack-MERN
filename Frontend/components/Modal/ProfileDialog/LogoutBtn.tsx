import { successToast } from "@/components/Shared/Toast/Toastify";
import { removeUserInfo } from "@/utils/processUserInfo";
import { MdOutlineLogout } from "react-icons/md";

const LogoutBtn = () => {
  const handleLogoutBtn = async () => {
    if (confirm("Are you sure you want to logout?")) {
      removeUserInfo();
      successToast("Logout Successfully Completed");
      location.reload();
    } else {
    }
  };

  return (
    <button
      onClick={handleLogoutBtn}
      className="flex items-center gap-1 text-sm absolute bottom-0 sm:bottom-auto sm:left-0"
    >
      <MdOutlineLogout />
      Logout
    </button>
  );
};

export default LogoutBtn;
