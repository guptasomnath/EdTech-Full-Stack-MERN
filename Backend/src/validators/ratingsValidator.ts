import Joi from "joi";

export const getRatingsValidator = Joi.object({
    courseID : Joi.string().required(),
    limit : Joi.number(),
    skip : Joi.number(),
    userID : Joi.string()
});

export const storeRatingValidator = Joi.object({
    userID : Joi.string().required(),
    courseID : Joi.string().required(),
    userName : Joi.string().required(),
    stars : Joi.number().required(),
    message : Joi.string().required()
});

export const updateRatingsValidator = Joi.object({
    ratingID : Joi.string().required(),
    userID : Joi.string().required(),
    message : Joi.string(),
    stars : Joi.number()
});