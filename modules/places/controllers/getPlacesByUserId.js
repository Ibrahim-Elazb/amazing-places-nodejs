// @ts-nocheck
const Place = require("../../../models/Place")

const getPlacesByUserId=(request,response,next)=>{
    const userId=request.params.userId;
    Place.find({creator:userId}).then(places=>{
        places=places.map(place=>{
            if(place.image){
                place.image=`https://amazing-places.herokuapp.com/places/images/${place.image}`
            }else{
                place.image=`https://amazing-places.herokuapp.com/places/images/no-image-place.png`
            }
            return place;
        })
        response.status(200).json({places_Count:places.length,places})
    }).catch(error=>{
        console.log(error)
        const customError = new Error();
        customError.statusCode = 500;
        customError.message = "System Problem Occurred";
        next(customError);
    })
}

module.exports=getPlacesByUserId;