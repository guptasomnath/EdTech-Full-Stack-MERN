import Joi from "joi";

export const getAllCoursesValidator = Joi.object({
    fields : Joi.string(),
    limit : Joi.number(),
    category : Joi.string(),
    skip : Joi.number(),
    q : Joi.string()
})

export const getCourseValidator = Joi.object({
    courseID : Joi.string().required(),
})