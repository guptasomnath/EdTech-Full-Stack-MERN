import React, { useState } from "react";
import Description from "./Description";
import CourseInfo from "./CourseInfo";
import { ICourseOverviewResponse, IRazorpayCreateOrder } from "@/types/CourseOverviewTypes";
import { API_BASE_URL } from "@/config/constant";
import { errorToast, successToast } from "../Shared/Toast/Toastify";
import { useRouter } from "next/navigation";
import SpinnerBtn from "../Shared/SpinnerBtn";
import {
  addUserEnrolledCourse,
  getUserInfo,
} from "../../utils/processUserInfo";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";
import Image from "next/image";
import { doQuery } from "doquery";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { oneTimeCache } from "@/utils/oneTimeCache";
import useRazorpay from "react-razorpay";
import { isUserEnrolled } from "@/utils/isUserEnrolled";

interface IOverviewProps {
  courseOverview: ICourseOverviewResponse | undefined;
}

interface RazorpaySuccesshandlerArgs {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

const ENROLL_COURSE_API = `${API_BASE_URL}/course/enroll`;
const CHECK_PAYMENT_API = `${API_BASE_URL}/payment/check`;

const OverviewDetails = ({ courseOverview }: IOverviewProps) => {
  const [btnSpinnerVisibility, setBtnSpinnerVisibility] = useState(false);
  const route = useRouter();
  const [Razorpay] = useRazorpay();

  const { token, name, _id: userID } = getUserInfo();
  const isUserAlreadyEnrolled = isUserEnrolled(courseOverview?._id || "");

  const enrollBtnOnClick = async () => {
    if (!isAuthenticated()) return route.push("/login");

    if (isUserAlreadyEnrolled) {
      route.push(`/watch/${courseOverview?._id}`);
      oneTimeCache.set("courseInfo", {
        title: courseOverview?.title,
        shortDescription: courseOverview?.shortDescription,
      });
      return;
    }

    setBtnSpinnerVisibility(true);

    const { success, error, response } = await doQuery<
      ISuccessResponse<IRazorpayCreateOrder>,
      IErrorResponse
    >({
      method: "POST",
      url: ENROLL_COURSE_API,
      header: { Authorization: "Bearer " + token },
      body: { courseID: courseOverview?._id },
    });

    if (!success) {
      setBtnSpinnerVisibility(false);
      errorToast(error?.message);
      return;
    }

    const price = courseOverview?.price || 0;
    if (price <= 0) {
      setBtnSpinnerVisibility(false);
      addUserEnrolledCourse(courseOverview?._id || "");
      successToast(response?.message);
      return;
    }

    openRazorpayPaymentPopup(response);
  };

  const openRazorpayPaymentPopup = (response: ISuccessResponse<IRazorpayCreateOrder> | null) => {
    const rzp1 = new Razorpay({
      key: `${response?.data.razorpayKey}`,
      amount: `${response?.data.amount}`,
      currency: "INR",
      name: name as string,
      order_id: `${response?.data.orderId}`,
      handler: handlePaymentSuccess,
    });

    rzp1.on("payment.failed", (response: any) => {
      setBtnSpinnerVisibility(false);
      errorToast(response.error.description);
    });

    rzp1.open();
  };

  const handlePaymentSuccess = async (res: RazorpaySuccesshandlerArgs) => {
    const { success, error, response } = await doQuery<ISuccessResponse>({
      method: "GET",
      header: { Authorization: `Bearer ${token}` },
      url: `${CHECK_PAYMENT_API}?order_id=${res.razorpay_order_id}&courseID=${courseOverview?._id}&userID=${userID}`,
    });

    if (!success) {
      setBtnSpinnerVisibility(false);
      errorToast(error?.message);
    }

    addUserEnrolledCourse(courseOverview?._id as string);
    successToast(response?.message);
    setBtnSpinnerVisibility(false);
  };

  return (
    <>
      <Image
        src={courseOverview?.thumbnail || ""}
        alt="course-thumbnail"
        height={100}
        width={100}
        className="aspect-video bg-slate-300 w-1/2 sm:w-full"
      />

      <div className="w-1/2 px-5 sm:w-full sm:px-0 sm:pt-3 sm:flex-none">
        <CourseInfo data={courseOverview} />
        <SpinnerBtn
          style="w-full rounded-md py-2 bg-slate-800 text-white font-semibold mt-2 transition-all hover:bg-slate-700 sm:w-full"
          text={isUserAlreadyEnrolled ? "Watch now" : "Enroll now"}
          onClick={enrollBtnOnClick}
          spinnerVisibility={btnSpinnerVisibility}
        />
      </div>

      <div className="w-full">
        <Description text={courseOverview?.longDescription} />
      </div>
    </>
  );
};

export default OverviewDetails;
