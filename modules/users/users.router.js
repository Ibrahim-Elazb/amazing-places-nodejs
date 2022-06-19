const express=require("express");
const getAllUsers = require("./controllers/getAllUsers");

const usersRouter=express.Router();
usersRouter.get("/",getAllUsers)
module.exports=usersRouter;