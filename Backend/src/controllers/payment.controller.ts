import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { CourseModel } from "../models/Course";
import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { ApiResponse } from "../utils/ApiResponse";
import { fetchAnOrder } from "../utils/createOrder";
import { isValidObjectId } from "../utils/isValidObjectId";
import { ErrorHander } from "../utils/ErrorHander";

export const checkPayment = catchAsyncErrors(async (req: Request, res: Response) => {

    const userID = req.query.userID as string;
    const order_id = req.query.order_id;
    const courseID = req.query.courseID as string;

    const errmsg = isValidObjectId([courseID, userID]);
    if (errmsg) throw new ErrorHander(errmsg, 400);

    const { amount_paid, status } = await fetchAnOrder(order_id.toString());

    const isPaymentSuccess = status === "paid";

    if(!isPaymentSuccess){
        return res.status(400).json(
            new ApiResponse(400, "Payment has not done yet")
        );
    }

    //getting the current course price;
    const courseDetails = await CourseModel.findById(courseID, "price");
    const coursePrice = courseDetails.price;

    //now check is the payment successfully completed and courese amount and paid amount are same or not 
    if (isPaymentSuccess && coursePrice === (amount_paid / 100)) {
        //if payment successfull then enroll the user to this course
        await UserModel.updateOne({ _id: userID }, {
            $addToSet: { enrolledCourses: courseDetails._id }
        })

        return res.status(200).json(
            new ApiResponse(200, "Enrollment successful.")
        )
    }

    res.status(400).json(
        new ApiResponse(400, "Perhaps there was a payment failure or a mismatch in the course amount. Please contact us for further details.")
    )

})