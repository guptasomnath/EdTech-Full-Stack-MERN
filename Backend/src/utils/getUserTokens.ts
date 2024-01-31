import { Request } from "express";

export const getUserTokens = (req : Request) => {
    const headerAuth = req.headers['authorization'];
    if(!headerAuth) return "";
    const bearer = headerAuth.split(' ');
    return bearer[1];
}