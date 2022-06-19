// @ts-nocheck
const User = require("../../../models/User")

const getAllUsers=(request,response,next)=>{
    User.find({}).select("name placesCount image").then(Users=>{
        Users=Users.map(user=>{
            if(user.image){
                user.image=`https://amazing-places.herokuapp.com/users/images/${user.image}`
            }else{
                user.image=`https://amazing-places.herokuapp.com/users/images/no-image-user.png`
            }
            return user;
        })
            response.status(200).json({Users_Count:Users.length,Users})
    }).catch(error=>{
        console.log(error)
        const customError = new Error();
        customError.statusCode = 500;
        customError.message = "System Problem Occurred";
        next(customError);
    })
}

module.exports=getAllUsers;