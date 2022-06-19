const Joi = require("joi");
const { ref } = require("joi");

const signUpValidationSchema={
    body:Joi.object().required().keys({
        name:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]([._-]|[a-zA-Z0-9]){1,30}[a-zA-Z0-9]$/)).required().messages({
            "any.required":"You must enter name",
            "string.empty":"You must enter name",
            "string.pattern.base":`name must start with letter, contains letters, numbers and(. , - , _ ) and underscore only. Name should be at least 3 characters, at maximum 30 characters`,
        }),
        email:Joi.string().email().required().messages({
            "any.required":"You must enter Email",
            "string.empty":"You must enter Email",
            "string.email":"Enter valid email"
        }),
        password:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)).required().messages({
            "any.required":"You must enter Password",
            "string.empty":"You must enter password",
            "string.pattern.base":` password  at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and Can contain special characters`,
        }),
        confirmPassword:Joi.string().valid(ref("password")).required().messages({
            "any.required":"You must enter Confirm Password",
            "string.empty":"You must enter Confirm password",
            "any.only":"password and confirm password should be the same"
        })
    })
}

const loginValidationSchema={
    body:Joi.object().required().keys({
        email:Joi.string().email().required().messages({
            "any.required":"You must enter Email",
            "string.empty":"You must enter Email",
            "string.email":"Enter valid email"
        }),
        password:Joi.string().required().messages({
            "any.required":"You must enter Password",
            "string.empty":"You must enter password",
        })
    })
}

module.exports={signUpValidationSchema,loginValidationSchema};