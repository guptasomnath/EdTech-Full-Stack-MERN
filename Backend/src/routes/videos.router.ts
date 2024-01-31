import { Router } from "express";
import { getAllVideosList, streamVideo, storeDemoData } from "../controllers/videos.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { checkStreamAccessibility } from "../middlewares/checkStreamAccessibility";

const videoRoute : Router = Router();

videoRoute
.get("/watch/:courseID", isAuthenticated, getAllVideosList)
.get("/videos/:courseID", isAuthenticated, getAllVideosList)
.get("/stream/:videoID/:videoAccessToken", checkStreamAccessibility, streamVideo)
.post("/store", isAuthenticated, storeDemoData)

export default videoRoute;