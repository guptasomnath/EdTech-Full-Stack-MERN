import React from "react";
import Image from "next/image";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";

const page = () => {
  return (
    <div className="w-full h-full bg-slate-50 flex items-center px-14 sm:px-0 bgtab:px-5">
      <div className="w-1/2 flex justify-center sm:w-full">
        <div className="w-[25rem] px-8 sm:w-full sm:px-5">
          <h1 className="font-bold text-2xl">Forgot Password</h1>
          <ForgotPasswordForm />
        </div>
      </div>
      <div className="w-1/2 flex justify-end sm:hidden">
        <Image
          src="forgot_password.svg"
          alt="forgot-password-vector"
          width={400}
          height={400}
          className="mr-10"
        />
      </div>
    </div>
  );
};

export default page;
