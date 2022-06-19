// @ts-nocheck
const Place = require("../../../models/Place")

const getPlaceById=(request,response,next)=>{
    const placeId=request.params.placeId;
    Place.findById(placeId).then(place=>{
        if(place){
                if(place.image){
                    place.image=`https://amazing-places.herokuapp.com/places/images/${place.image}`
                }else{
                    place.image=`https://amazing-places.herokuapp.com/places/images/no-image-place.png`
                }
            response.status(200).json({place})
        }else{
            const customError = new Error();
            customError.statusCode = 400;
            customError.message = "No such places with this ID";
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

module.exports=getPlaceById;