import { Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { RatingsModule } from "../models/Ratings";
import { getRatingsValidator, storeRatingValidator, updateRatingsValidator } from "../validators/ratingsValidator";
import { ErrorHander } from "../utils/ErrorHander";
import { getTotalPageNumber } from "../utils/getTotalPageNumber";
import { ApiResponse } from "../utils/ApiResponse";
import { CourseModel } from "../models/Course";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const getRatings = catchAsyncErrors(async (req: Request, res: Response) => {

  const { error } = getRatingsValidator.validate(req.query);
  if (error) throw new ErrorHander(error.message, 400);

  const courseID = req.query.courseID as string;
  const limit = parseInt(req.query.limit as string || "6");
  const skip = parseInt(req.query.skip as string || "0");
  const userID = req.query.userID as string;
  
  const findQuery = {
    courseID: { $eq: new ObjectId(courseID) }
  };

  const pipeline: any = [
    {
      $match: findQuery
    },
    {
      $facet: {
        "totalCount": [
          {
            $count: "value",
          },
        ],
        "allRatings": [
          {
            $skip: skip,
          },
          {
            $limit: limit,
          }
        ],
      }
    }
  ];

  if (userID) {
    pipeline[1].$facet.userRatingInfo = [
      {
        $match: {
          userID: new ObjectId(userID)
        }
      }
    ]
  }

  const result = await RatingsModule.aggregate(pipeline);


  const totalDocuments = result[0].totalCount.length !== 0 ? result[0].totalCount[0].value : 0; 

  const returnResponse: any = {
    ratings: result[0].allRatings,
    pages: getTotalPageNumber(totalDocuments, limit)
  }

  if (userID) {
    returnResponse.userRatingDetails = result[0].userRatingInfo?.[0];
  }

  res.status(200).json(
    new ApiResponse(200, "Success", returnResponse)
  );
})

export const storeRating = catchAsyncErrors(async (req: Request, res: Response) => {
  const { error } = storeRatingValidator.validate(req.body);
  if (error) throw new ErrorHander(error.message, 400);

  const { courseID, stars } = req.body;
  
  const course = await CourseModel.findById(courseID, ['ratings', 'totalRatings']);
  const newTotalRatings = course.totalRatings + 1;
  const newAveRating = ((course.ratings * course.totalRatings + stars) / newTotalRatings).toFixed(1);

  await RatingsModule.create(req.body);

  const filter = { _id: courseID };
  const update = {
    ratings: newAveRating,
    totalRatings: newTotalRatings
  }
  await CourseModel.updateOne(filter, update);
 
  res.status(201).json(
    new ApiResponse(201, "Rating Added Successfully.")
  );

})

export const updateRating = catchAsyncErrors(async (req: Request, res: Response) => {
  const { error } = updateRatingsValidator.validate(req.body);
  if (error) throw new ErrorHander(error.message, 400);

  const ratingID = req.body.ratingID;
  const userID = req.body.userID;

  const ratingsDetails = await RatingsModule.findById(ratingID);
  if (!ratingsDetails) throw new ErrorHander(`invalid id ${ratingID}`, 404);

  const newMessage = req.body.message || ratingsDetails.message;
  const userStar = req.body.stars || ratingsDetails.stars;

  if (ratingsDetails.userID != userID) throw new ErrorHander(`invalid user id ${userID}`, 404);

  //if rating did not changed than don't need to update rating in course module
  if (ratingsDetails.stars !== userStar) {
    const course = await CourseModel.findById(ratingsDetails.courseID, ['ratings', 'totalRatings']);
    const newAveRating = (((course.ratings * course.totalRatings) - ratingsDetails.stars + userStar) / course.totalRatings).toFixed(1);

    const filter = { _id: ratingsDetails.courseID };
    const update = {
      ratings: newAveRating
    }
    await CourseModel.updateOne(filter, update);
  }

  await RatingsModule.updateOne({ _id: ratingID }, { message: newMessage, stars: userStar });

  res.status(200).json(
    new ApiResponse(200, "Rating Updated Successfully.")
  )

})