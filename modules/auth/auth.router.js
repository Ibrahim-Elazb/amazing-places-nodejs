const express=require("express");
const validation = require("../../middleWare/validation");
const { signUpValidationSchema, loginValidationSchema } = require("./auth.validation");
const signUp = require("./controllers/signup");
const login = require("./controllers/login");
const { multerUpload, multerValidFileTypes } = require("../../services/multerUpload");
const uploadUserImage=multerUpload(multerValidFileTypes.image,"upload/users/images").single("image");
const authRouter=express.Router();

authRouter.post("/signup",uploadUserImage,validation(signUpValidationSchema),signUp);
authRouter.post("/login",validation(loginValidationSchema),login);
module.exports=authRouter;