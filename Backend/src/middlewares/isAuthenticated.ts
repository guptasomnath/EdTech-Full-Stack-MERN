import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "./catchAsyncErrors";
import { ErrorHander } from "../utils/ErrorHander";
import { vefifyJwtToken } from "../services/auth";
import { getUserTokens } from "../utils/getUserTokens";

export const isAuthenticated = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const token = getUserTokens(req);

    if(!token) throw new ErrorHander("Please provide an authorization token.", 401);

    const [ data, error ] = vefifyJwtToken(token);
    if(error) throw new ErrorHander("The token has expired or is incorrect.", 401)
  
    next();
        
})