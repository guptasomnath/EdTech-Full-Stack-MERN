"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
// import Toast from "@/components/Shared/Toast/Toast";
import ModalBackground from "@/components/Modal/ModalBackground";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { usePathname } from "next/navigation";
import ParticalBackground from "@/components/Others/ParticalBackground";
import Filter from "@/components/Courses/Filters";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function MyProvider({ child }: any) {
  const path = usePathname();
  const listColor = path === "/" ? "#d8d6d6" : "#000000";
  let NavbarVisibility: React.JSX.Element | null = (
    <Navbar listColor={listColor} />
  );
  if (path === "/login" || path === "/signup" || path === "/forgotpassword") {
    NavbarVisibility = null;
  }
  return (
    <Provider store={store}>
      <ModalBackground />
      {path === "/" ? <ParticalBackground /> : null}
      {NavbarVisibility}
      {child}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Provider>
  );
}
