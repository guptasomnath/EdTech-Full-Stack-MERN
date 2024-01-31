"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "../Shared/Toast/Toastify";
import { API_BASE_URL } from "@/config/constant";
import { loginFormSchema } from "@/validator/authValidator";
import SpinnerBtn from "../Shared/SpinnerBtn";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";
import { doQuery } from "doquery";

const LOGIN_URL = `${API_BASE_URL}/users/login`;

interface FormType {
  email: string | undefined;
  password: string | undefined;
}

interface ResponseType {
  _id: string;
  name: string;
  email: string;
  token: string;
}

const LoginForm = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, []);

  const [spinnerVisibility, setSpinnerVisibility] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const doLogin = async (reqBody: FormType) => {
    setSpinnerVisibility(true);

    const { success, response, error } = await doQuery<
      ISuccessResponse<ResponseType>,
      IErrorResponse
    >({
      method: "POST",
      header: { "Content-Type": "application/json" },
      url: LOGIN_URL,
      body: reqBody,
    });

    setSpinnerVisibility(false);

    if (!success) {
      errorToast(error?.message);
      return;
    }

    if (!response?.data) return errorToast("No auth token get from the server");

    successToast(response?.message);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    router.push("/");
  };

  const handleLoginSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (spinnerVisibility) return;

    const formData = {
      email: emailRef?.current?.value.trim(),
      password: passwordRef?.current?.value.trim(),
    };

    const { error } = loginFormSchema.validate(formData, { abortEarly: false });

    if (error) {
      errorToast(error.details[0].message);
      return;
    }

    doLogin(formData);
  };

  return (
    <form className="mt-5">
      <div className="mt-4 mb-1">
        <p className="font-semibold">Email Address</p>
        <input
          ref={emailRef}
          className="input-style"
          type="email"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex justify-between mt-4 mb-1">
        <p className="font-semibold">Password</p>
        <Link className="link-style text-sm" href="/forgotpassword">
          Forgot Password
        </Link>
      </div>

      <input
        ref={passwordRef}
        className="input-style"
        type="password"
        placeholder="Enter 6 character or more"
      />

      <SpinnerBtn
        text="LOGIN"
        onClick={handleLoginSubmit}
        spinnerVisibility={spinnerVisibility}
      />
    </form>
  );
};

export default LoginForm;
