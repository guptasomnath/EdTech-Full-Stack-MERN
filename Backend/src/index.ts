import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import { connectDatabase } from "./db/database";
import userRouter from "./routes/user.route";
import courseRoute from "./routes/courses.router";
import ratingsRoute from "./routes/ratings.router";
import { ErrorHander } from "./utils/ErrorHander";
import globalErrorHandler from "./controllers/error.controller";
import paymentRoute from "./routes/payment.router";
import videoRoute from "./routes/videos.router";
import categorysRoute from "./routes/categorys.router";

const app: Express = express();
dotenv.config();
connectDatabase();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views')); 
app.use(cors({ origin : process.env.ALLOW_ORIGIN_URL }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/categorys", categorysRoute);
app.use("/api/v1/rating", ratingsRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/video", videoRoute);

app.all("*", (req, res, next) => {
    const err = new ErrorHander(`Can't find ${req.originalUrl} on the server`, 404);
    next(err);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));