"use client";

import React, { useEffect, useRef, useState } from "react";
import SpinnerBtn from "../Shared/SpinnerBtn";
import { useRouter } from "next/navigation";
import { forgotPassFormSchema } from "@/validator/authValidator";
import { errorToast, successToast } from "../Shared/Toast/Toastify";
import { doQuery } from "doquery";
import { API_BASE_URL } from "@/config/constant";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";

const FORGOT_PASSWORD_URL = `${API_BASE_URL}/users/forgotpassword`;

interface FormType {
  email: string | undefined;
}

const ForgotPasswordForm = () => {
  const route = useRouter();
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  let formData: FormType;

  useEffect(() => {
    if (isAuthenticated()) {
      route.push("/");
    }
  }, []);

  const doForgotPassword = async () => {
    setSpinnerVisibility(true);
    const { success, error, response } = await doQuery<
      ISuccessResponse,
      IErrorResponse
    >({
      method: "POST",
      url: FORGOT_PASSWORD_URL,
      body: formData,
    });
    setSpinnerVisibility(false);

    if (!success) {
      errorToast(error?.message);
      return;
    }

    successToast(response?.message);
    route.push("/login");
  };
  const handleForgotPassBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (spinnerVisibility) return;

    formData = {
      email: emailRef?.current?.value.trim(),
    };

    const { error } = forgotPassFormSchema.validate(formData, {
      abortEarly: false,
    });
    if (error) {
      errorToast(error.details[0].message);
      return;
    }

    doForgotPassword();
  };
  return (
    <form className="mt-5">
      <div className="mt-4 mb-1">
        <p className="font-semibold">Enter Your Email</p>
        <input
          ref={emailRef}
          className="input-style"
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <SpinnerBtn
        text="Forgot Password"
        onClick={handleForgotPassBtn}
        spinnerVisibility={spinnerVisibility}
      />
    </form>
  );
};

export default ForgotPasswordForm;
