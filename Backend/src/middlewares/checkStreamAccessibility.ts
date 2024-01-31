import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "./catchAsyncErrors";
import { ErrorHander } from "../utils/ErrorHander";
import { vefifyJwtToken } from "../services/auth";
import { streamVideoValidator } from "../validators/videos.validator";

export const checkStreamAccessibility = catchAsyncErrors(async (req: Request, res: Response, next : NextFunction) => {
    
    //check validation
    const { error } = streamVideoValidator.validate(req.params);
    if (error) throw new ErrorHander(error.message, 400);

    const videoAccessToken = req.params.videoAccessToken;
    
    const [tokenData, err] = vefifyJwtToken(videoAccessToken);
    if (err) throw new ErrorHander("Video access token is expired or wrong try again", 400);

    next();

})