import { Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { CategorysModel } from "../models/Categorys";
import { ApiResponse } from "../utils/ApiResponse";
import { CourseModel } from "../models/Course";

export const getAllCategorys = catchAsyncErrors(async (req: Request, res: Response) => {
    res.status(200).json(
        new ApiResponse(200, "All Categorys", await CategorysModel.find({}))
    )
})

export const storeCategory = catchAsyncErrors(async (req: Request, res: Response) => {
    const courses = await CourseModel.find({});
    const categorys : {categoryName : string}[] = [];
    courses.forEach((item) => {
        const catName = item.categoryName;
        const isExist = categorys.some(cat => cat.categoryName === catName);
        if(!isExist){
            categorys.push({categoryName : catName});
        }
    })


    await CategorysModel.create(categorys);
    res.status(201).json(
        new ApiResponse(200, "Categorys stored successfully")
    )
})