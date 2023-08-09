import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required().valid(joi.ref('password'))
});

export const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});