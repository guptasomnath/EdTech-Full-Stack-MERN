import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { getAllVideosValidator } from "../validators/videos.validator";
import { ErrorHander } from "../utils/ErrorHander";
import { VideosModel } from "../models/Videos";
import { vefifyJwtToken } from "../services/auth";
import { UserModel } from "../models/User";
import path from "path";
import fs from "fs";
import { ApiResponse } from "../utils/ApiResponse";
import { getUserTokens } from "../utils/getUserTokens";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const getAllVideosList = catchAsyncErrors(async (req: Request, res: Response) => {

    //check validation
    const { error } = getAllVideosValidator.validate(req.params);
    if (error) throw new ErrorHander(error.message, 400);

    //get user id from jwt token
    const requestToken = getUserTokens(req);
    const [tokenData, err] = vefifyJwtToken(requestToken);
    if (err) throw new ErrorHander("Wrong jwt access token", 400);

    const userId = tokenData._id;
    const courseID: any = req.params.courseID;

    //check is the user enrolled to this course or not if not show error
    const userDetails = await UserModel.findById(userId, "enrolledCourses");
    if (!userDetails.enrolledCourses.includes(courseID)) {
        throw new ErrorHander("You are not enrolled in this course.", 400);
    }

    //set find query
    const findQuery = {
        courseID: courseID
    }

    //create video access token
    const vidAccessToken = jwt.sign({ accessID: uuidv4() }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_VIDEO_ACCESS_EXPIRE });

    //sort the Videos in assanding order to mantain the Videos order
    const videosInfo = await VideosModel.find(findQuery).sort({ videoNumber: 1 });
    if (!videosInfo) throw new ErrorHander("No video available", 400);

    const returnData = {
        videos: videosInfo,
        videoAccessToken: vidAccessToken
    }

    res.status(200).json(new ApiResponse(200, "Success", returnData));

});

export const streamVideo = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const videoID = req.params.videoID;

    const filePath = path.join(__dirname, `../videos/${videoID}.mp4`);

    fs.stat(filePath, (err, stats) => {

        if (err) {
            return next(new ErrorHander("Video is not exist", 400));
        }

        const videoSize = stats.size;
        const range = req.headers.range;

        if (!range) {
            const head = {
                'Content-Length': videoSize,
                'Content-Type': 'video/mp4'
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
            return;
        }

        const chunkSize = 2 * 1e6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize, videoSize - 1);
        const contentLength = end - start + 1;

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }

        res.writeHead(206, headers);

        const stream = fs.createReadStream(filePath, {
            start,
            end
        })
        stream.pipe(res)
    })

});

export const storeDemoData = async (req: Request, res: Response) => {
    const demoVideoData = [
        {
            "courseID": "65584d860c7b682ddf8368a4",
            "title": "Html Full Video",
            "duration": "3500",
            "lessonNumber": 1

        },

        {
            "courseID": "65584d860c7b682ddf8368a4",
            "title": "Learn how to use css with html",
            "duration": "2500",
            "lessonNumber": 2

        },

        {
            "courseID": "65584d860c7b682ddf8368a4",
            "title": "Learn how to use javascript with html, and css",
            "duration": "250000",
            "lessonNumber": 3
        }
    ]

    await VideosModel.create(demoVideoData);
    res.send("Data stored");
}