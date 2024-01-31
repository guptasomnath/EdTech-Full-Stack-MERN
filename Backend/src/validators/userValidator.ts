import Joi from "joi";

export const signupValidator = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.required()
})

export const loginValidator = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.required()
})

export const forgotPassValidator = Joi.object({
    email : Joi.string().email().required()
})

export const resetPasswordValidator = Joi.object({
    id : Joi.string().required()
})

export const resetPassFormValidator = Joi.object({
    formId : Joi.string().required(),
    newPassword : Joi.string().required(),
    newReTypePassword : Joi.string().required()
})