import { Request, Response, NextFunction } from "express";
import { ErrorHander } from "../utils/ErrorHander";
import { ApiResponse } from "../utils/ApiResponse";

const devError = (res: Response, error: ErrorHander) => {
  res.status(error.statusCode | 400).json({
    isSuccess: false,
    message: error.message,
    stackStrace: error.stack,
    error: error
  });
}

const prodError = (res: Response, error: ErrorHander) => {
  if (!error.isOperational) {
    res.status(500).json(
      new ApiResponse(500, "Something went wrong! please try again later.")
    )
    return;
  }

  res.status(error.statusCode).json(
    new ApiResponse(error.statusCode, error.message)
  );
}

export default (error: ErrorHander, req: Request, res: Response, next: NextFunction) => {
  
  let err = { ...error };

  // Wrong Mongodb Id or wrong Id type error
  if (err.name === "CastError" || err.kind === "ObjectId") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHander(message, 404);
  }

  // Mongoose duplicate key error
  if (err.code === 11000 || err.code === 11001) {
    const msg = `This ${JSON.stringify(error.keyValue)} is already exist`;
    err = new ErrorHander(msg, 409);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHander(message, 400);
  }


  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHander(message, 400);
  }

  prodError(res, err);
}