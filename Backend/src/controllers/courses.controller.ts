import { Request, Response } from "express";
import { CourseModel } from "../models/Course";
import { UserModel } from "../models/User";
import { getAllCoursesValidator, getCourseValidator } from "../validators/courseValidator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { ErrorHander } from "../utils/ErrorHander";
import { getTotalPageNumber } from "../utils/getTotalPageNumber";
import { vefifyJwtToken } from "../services/auth";
import { ApiResponse } from "../utils/ApiResponse";
import { getUserTokens } from "../utils/getUserTokens";
import { FilterModule } from "../models/Filters";
import { createFakeCoursesData } from "../utils/fakeDataGenerator";
import { createOrder } from "../utils/createOrder";
import { isValidObjectId } from "../utils/isValidObjectId";

export const queryCourse = catchAsyncErrors(async (req: Request, res: Response) => {
    //this controller for both /courses and /search route

    //validation
    const { error } = getAllCoursesValidator.validate(req.query);
    if (error) throw new ErrorHander(error.message, 400);


    const searchQuery = req.query.q || null;


    //extract values from request body
    const limit = parseInt(req.query.limit as string || "6");
    const skip = parseInt(req.query.skip as string || "0");
    const reqCategoryName = req.query.category || null;
    const fields = req.query.fields as string;

    let findQuery: any = {};
    const userNeededFields: any = {};
    if (fields) {
        userNeededFields.$project = {};
        fields.split(" ").forEach((fildName) => {
            userNeededFields.$project[fildName] = 1
        })
    }

    //if use hit /search api
    if (searchQuery) {
        findQuery = { $text: { $search: `${searchQuery}` } }
    }

    //if catagory key avilable in request body than add it to find query object
    if (reqCategoryName) {
        findQuery.categoryName = { $eq: reqCategoryName };
    }

    const aggArr = [
        {
            $match: findQuery
        },
        {
            $facet: {
                // Pipeline for counting documents
                "totalCount": [
                    {
                        $count: "value",
                    },
                ],
                // Pipeline for fetching documents with skip and limit
                "documents": [
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    }
                ],
            },
        }
    ]

    if (fields) {
        aggArr[1].$facet.documents.push(userNeededFields);
    }

    const result = await CourseModel.aggregate(aggArr);

    const totalDocumentLength = result[0].totalCount[0]?.value || 0;
    const documents = result[0].documents;

    const returnValues = {
        pages: getTotalPageNumber(totalDocumentLength, limit),
        courses: documents
    }

    res.status(200).json(
        new ApiResponse(200, "Success", returnValues)
    );

})

export const getCourse = catchAsyncErrors(async (req: Request, res: Response) => {

    //validate id
    const { error } = getCourseValidator.validate(req.params)
    if (error) throw new ErrorHander(error.message, 400);

    //if data not exist with this id throw error
    const courseID = req.params.courseID;

    const errmsg = isValidObjectId([courseID]);
    if (errmsg) throw new ErrorHander(errmsg, 400);

    const response = await CourseModel.findById(courseID, req.body.query);
    if (!response) throw new ErrorHander(`Course does not exist with this id ${courseID}`, 404);

    res.status(200).json(
        new ApiResponse(200, "Success", response)
    );

})

export const enrollCourse = catchAsyncErrors(async (req: Request, res: Response) => {

    const { error } = getCourseValidator.validate(req.body);
    if (error) throw new ErrorHander(error.message, 400);

    const courseID = req.body.courseID;

    const errmsg = isValidObjectId([courseID]);
    if (errmsg) throw new ErrorHander(errmsg, 400);

    const requestToken = getUserTokens(req);
    const [tokenValue, err] = vefifyJwtToken(requestToken);
    if (err) throw new ErrorHander("Please provide an authorization token.", 401);

    const userIdfromJwt = tokenValue._id;

    //check is user Already Enrolled To This course or not
    const userDetails = await UserModel.findById(userIdfromJwt, "enrolledCourses");
    if (userDetails.enrolledCourses.includes(courseID)) {
        return res.status(409).json(
            new ApiResponse(409, "The user has already enrolled in this course.")
        );
    }

    //check is the course is free or paid
    const courseDetails = await CourseModel.findById(courseID, "price title");

    //if course is free enrolled the user
    if (courseDetails.price === 0) {
        await UserModel.updateOne({ _id: userIdfromJwt }, {
            $addToSet: { enrolledCourses: courseDetails._id }
        })
        return res.status(200).json(
            new ApiResponse(200, "Enrollment successful.")
        )
    }

    //if course is paid then create payment links
    const { id, amount } = await createOrder(courseDetails.price * 100);

    res.status(201).json(
        new ApiResponse(201, "Order id created", { orderId: id, amount, razorpayKey: process.env.RAZORPAY_KEY_ID }) //paymentPage.data.longurl
    )

})

export const filterCourse = catchAsyncErrors(async (req: Request, res: Response) => {

    const findQuery = req.body.query;
    if (!findQuery) throw new ErrorHander("'query' field in required", 400);

    const limit = parseInt(req.query.limit as string || "6");
    const skip = parseInt(req.query.skip as string || "0");


    const result = await CourseModel.aggregate([
        {
            $match: findQuery
        },
        {
            $facet: {
                // Pipeline for counting documents
                "totalCount": [
                    {
                        $count: "value",
                    },
                ],
                // Pipeline for fetching documents with skip and limit
                "documents": [
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    }
                ],
            },
        }

    ])

    const totalDocumentLength = result[0].totalCount[0]?.value || 0;
    const documents = result[0].documents;

    const returnValues = {
        pages: getTotalPageNumber(totalDocumentLength, limit),
        courses: documents
    }

    res.status(200).json(
        new ApiResponse(200, "Success", returnValues)
    );

})

export const getFilters = catchAsyncErrors(async (req: Request, res: Response) => {
    res.status(200).json(
        new ApiResponse(200, "Success", await FilterModule.find({}))
    )
})

export const getUsersCourse = catchAsyncErrors(async (req: Request, res: Response) => {

    const ids: any = req.query.ids;
    const courseIdsArray = ids.split("AND");

    res.status(200).json(
        new ApiResponse(200, "", await CourseModel.find().where("_id").in(courseIdsArray))
    )

})

export const storeCourse = catchAsyncErrors(async (req: Request, res: Response) => {
    const store = await CourseModel.create(await createFakeCoursesData());
    if (store) return res.json(new ApiResponse(200, "Data stored"));
    res.json(new ApiResponse(400, "Data not sotred"));
})
