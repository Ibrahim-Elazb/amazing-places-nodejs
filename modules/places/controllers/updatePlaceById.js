// @ts-nocheck
const Place = require("../../../models/Place")

const updatePlaceById=(request,response,next)=>{
    const placeId=request.params.placeId;
    const userId=request.userInfo.id;
    const { title, description, address, location } = request.body;
    const image = request.file?.filename;
    Place.findOneAndUpdate({_id:placeId,creator:userId},{title,description,address,location,image},{new:true}).then(place=>{
        if(place){
            response.status(200).json({place,message:"Place is Updated"})
        }else{
            const customError = new Error();
            customError.statusCode = 402;
            customError.message = "Unable to Update this place";
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

module.exports=updatePlaceById;