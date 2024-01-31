import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { sendPasswordResetEmail, sendVerifyEmail } from "../services/sendEmail";
import { pendingVerifyMailList } from "../utils/pendingVerifyMailList";
import { signupValidator, forgotPassValidator, resetPassFormValidator, resetPasswordValidator, loginValidator } from "../validators/userValidator";
import { ErrorHander } from "../utils/ErrorHander";
import { createJwtToken } from "../services/auth";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

  //validation
  const { error } = loginValidator.validate(req.body);
  if (error) throw new ErrorHander(error.message, 400);

  //extract user information from http request
  const { email, password } = req.body;

  //find the user from database
  const user = await UserModel.findOne({ email: email });

  //check user existence
  if (!user) throw new ErrorHander("User is not exist", 404);

  //check is user verify email or not
  if(!user.isVerified) throw new ErrorHander("Please veify your email first", 400);

  //check user psssword
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) throw new ErrorHander("Password is wrong", 401);


  const token = createJwtToken({ _id: user._id, email: user.email });
  const returnResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
    enrolledCourses: user.enrolledCourses
  };
  res.status(200).json(
    new ApiResponse(200, "Login successfull", returnResponse)
  )

})

export const signup = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

  //validation
  const { error } = signupValidator.validate(req.body);
  if (error) throw new ErrorHander(error.message, 400);

  //extract user information from http request
  const { name, email, password } = req.body;

  //sending verification email
  await sendVerifyEmail(email);

  //store user information
  const result = await UserModel.create({
    name,
    email,
    password
  });

  if (!result) throw new ErrorHander("An error occurred during the signup process.", 500);

  res.status(201).json(
    new ApiResponse(200, "A vefifycation mail has sended to your gmail account")
  );

})

export const verifyEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  // extract id
  const id = req.params.id;

  // throw error if link has expired
  if (!pendingVerifyMailList.has(id)) return res.render("emailVerified", { success: false, message: "Opps! Link has expired. please try again later" });

  const userEmail = pendingVerifyMailList.get(id);
  await UserModel.findOneAndUpdate({ email: userEmail }, { isVerified: true });

  pendingVerifyMailList.delete(id);

  res.render("emailVerified", { success: true, message: "Email successfully verified." });
})

export const forgotPassword = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

  //validation
  const { error } = forgotPassValidator.validate(req.body);
  if (error) throw new ErrorHander(error.message, 400);


  const { email } = req.body;

  //find user form databse
  const user = await UserModel.findOne({ email: email });

  //check user existence
  if (!user) throw new ErrorHander("User is not exist", 404);

  const response = await sendPasswordResetEmail(email);
  res.status(200).json(
    new ApiResponse(200, "Password reset email has been sent to your Gmail.")
  )

})

export const resetPasswordPage = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

  //validation
  const { error } = resetPasswordValidator.validate(req.params);
  if (error) throw new ErrorHander("id params is require", 400);

  const { id } = req.params;

  //if id is not exist
  if (!pendingVerifyMailList.has(id)) return res.render('forgotPassword', { formId: null, message: "Like has expired" });

  res.render('forgotPassword', { formId: id, message: null });
});

export const updatePassword = catchAsyncErrors(async (req: Request, res: Response) => {

  const { error } = resetPassFormValidator.validate(req.body);
  if (error) return res.render('forgotPassword', { formId: null, message: error.message });

  const { formId, newPassword, newReTypePassword } = req.body;

  if (!pendingVerifyMailList.has(formId)) throw new ErrorHander("form id is not exist", 404);

  const userEmail = pendingVerifyMailList.get(formId);
  pendingVerifyMailList.delete(formId);

  await UserModel.updateOne({ email: userEmail }, { password: newPassword });
  res.render('forgotPassword', { formId: null, message: "Password Updated Successfully." });
})

export const getProfileInfo = catchAsyncErrors(async (req: Request, res: Response) => {

  const userInfo = await UserModel.aggregate([
    {
      $match: {
        _id: new ObjectId(req.params.userID)
      }
    },
    {
      $project: {
        password: 0
      }
    },
    {
      $lookup: {
        from: "courses",
        localField: "enrolledCourses",
        foreignField: "_id",
        as: "coursesDetails"
      }
    },

    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        isVerified: 1,
        enrolledCourses: 1,
        "coursesDetails._id": 1,
        "coursesDetails.title": 1,
        "coursesDetails.thumbnail": 1,
        "coursesDetails.duration": 1,
      }
    }
  ]);

  if (userInfo.length === 0) {
    throw new ErrorHander("User not exist", 400);
  }

  res.status(200).json(
    new ApiResponse(200, "User profile datas", userInfo[0])
  );
})

export const logOut = (req: Request, res: Response) => {
  res.status(200).json(
    new ApiResponse(200, "Logged out")
  );
}