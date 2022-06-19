// @ts-nocheck
const jwt=require("jsonwebtoken");
const authentication = (request, response, next) => {
    const token = request.headers['authorization']?.split(" ")[1];
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET,(error,userInfo)=>{
            if(!error){
                // console.log({userInfo})
                request.userInfo=userInfo;
                next()
            }else{
                const customError = new Error();
                customError.statusCode = 402;
                customError.message = "Invalid token";
                next(customError);
            }
        })
    }else{
        const customError = new Error();
        customError.statusCode = 402;
        customError.message = "Log in";
        next(customError);
    }
}

module.exports = authentication;