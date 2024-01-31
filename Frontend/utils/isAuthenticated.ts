"use client"

import { getUserInfo } from "./processUserInfo";

export const isAuthenticated = () => {
    const { token } = getUserInfo();
    if(!token) return false;
    return true;
}