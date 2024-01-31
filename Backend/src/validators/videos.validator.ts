import Joi from "joi";

export const getAllVideosValidator = Joi.object({
    courseID : Joi.string().required()
})

export const streamVideoValidator = Joi.object({
    videoID : Joi.string().required(),
    videoAccessToken : Joi.string().required()
})