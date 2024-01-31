"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "../Shared/Toast/Toastify";
import { signupFormSchema } from "@/validator/authValidator";
import { API_BASE_URL } from "@/config/constant";
import { doQuery } from "doquery";
import SpinnerBtn from "../Shared/SpinnerBtn";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { IErrorResponse, ISuccessResponse } from "@/types/ApiTypes";

const SIGN_UP_URL = `${API_BASE_URL}/users/signup`;

interface FormType {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

const SignupForm = () => {
  const route = useRouter();

  const [spinnerVisibility, setSpinnerVisibility] = useState(false);

  const fullName = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  let formData: FormType;

  useEffect(() => {
    if (isAuthenticated()) {
      route.push("/");
    }
  }, []);

  const doSignUp = async () => {
    setSpinnerVisibility(true);
    const dataToStore = formData;
    const { success, error, response } = await doQuery<
      ISuccessResponse,
      IErrorResponse
    >({
      method: "POST",
      url: SIGN_UP_URL,
      header : {"Content-Type" : "application/json"},
      body: dataToStore,
    });
    setSpinnerVisibility(false);
    if (!success) {
      errorToast(error?.message);
      return;
    }

    successToast(response?.message);
    route.push("/login");
  };

  const handleSignUpBtn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (spinnerVisibility) return;

    formData = {
      name: fullName?.current?.value.trim(),
      email: emailRef?.current?.value.trim(),
      password: passwordRef?.current?.value.trim(),
    };

    const { error } = signupFormSchema.validate(formData);
    if (error) {
      errorToast(error.details[0].message);
      return;
    }

    doSignUp();
  };

  return (
    <form className="mt-5">
      <div className="mt-4 mb-1">
        <p className="font-semibold">Full Name</p>
        <input
          ref={fullName}
          className="input-style"
          type="text"
          placeholder="Somnath Gupta"
        />
      </div>

      <div className="mt-4 mb-1">
        <p className="font-semibold">Email Address</p>
        <input
          ref={emailRef}
          className="input-style"
          type="email"
          placeholder="you@example.com"
        />
      </div>

      <div className="mt-4 mb-1">
        <p className="font-semibold">Password</p>
        <input
          ref={passwordRef}
          className="input-style"
          type="password"
          placeholder="Enter 6 character or more"
        />
      </div>

      <SpinnerBtn
        text="SIGNUP"
        onClick={handleSignUpBtn}
        spinnerVisibility={spinnerVisibility}
      />
    </form>
  );
};

export default SignupForm;
