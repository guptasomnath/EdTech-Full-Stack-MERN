import Joi from "joi";

export const loginFormSchema = Joi.object({
  email : Joi.string().email({ tlds : { allow : false } }).required(),
  password : Joi.string().min(6).required()
});

export const signupFormSchema = Joi.object({
  name : Joi.string().required(),
  email : Joi.string().email({ tlds : { allow : false } }).required(),
  password : Joi.string().min(6).required()
});

export const forgotPassFormSchema = Joi.object({
  email : Joi.string().email({ tlds : { allow : false } }).required(),
});