// @ts-nocheck
const Place = require("../../../models/Place")

const deletePlaceById=(request,response,next)=>{
    const placeId=request.params.placeId;
    const userId=request.userInfo.id;
    Place.findOneAndDelete({_id:placeId,creator:userId}).then(place=>{
        if(place){
            response.status(200).json({place,message:"Place is deleted"})
        }else{
            const customError = new Error();
            customError.statusCode = 402;
            customError.message = "Unable to delete this place";
            next(customError);
        }
    }).catch(error=>{
        console.log(error)
        const customError = new Error();
        customError.statusCode = 500;
        customError.message = "System Problem Occurred";
        next(customError);
    })
}

module.exports=deletePlaceById;