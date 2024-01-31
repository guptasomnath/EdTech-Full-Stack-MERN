import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { login, signup, verifyEmail, forgotPassword, resetPasswordPage, updatePassword, getProfileInfo, logOut } from "../controllers/user.controller";
const userRouter : Router = Router();

userRouter
.post("/login", login)
.post("/signup", signup)
.get("/verify/:id", verifyEmail)
.post("/forgotpassword", forgotPassword)
.get("/resetpassword/:id", resetPasswordPage)
.post("/updatepassword", updatePassword)
.get("/profile/:userID", isAuthenticated, getProfileInfo)
.get("/logout", logOut);

export default userRouter;