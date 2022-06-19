// @ts-nocheck
const User = require("../../../models/User");

const signUp=(request,response,next)=>{
    const {name,email,password}=request.body;
    const image=request.file?.filename;
    const newUser=new User({name,email,password,image});
    newUser.save().then(result=>{
        response.status(201).json({message:"User added successfully"})
    }).catch(error=>{
        const customError=new Error();
        if(error.keyValue?.email){
            customError.statusCode=400;
            customError.message="email is already exist";
        }else {
            console.log(customError);
            customError.statusCode=500;
            customError.message="System Error Occurred";
        }
        next(customError)
    })
    
}

module.exports=signUp;