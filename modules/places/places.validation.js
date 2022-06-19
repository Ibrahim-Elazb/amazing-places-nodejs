const Joi=require("joi");

const addPlaceValidSchema={
    body:Joi.object().required().keys({
        title:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]([._-\s]|[a-zA-Z0-9]){1,30}[a-zA-Z0-9]$/)).required().messages({
            "any.required":"You must enter place Name",
            "string.empty":"You must enter place Name",
            "string.pattern.base":`title must start with letter, contains letters, numbers and(. , - , _ , space) and underscore only. Name must be at least 3 characters, at maximum 32 characters`
        }),
        description:Joi.string().min(10).max(500).required().messages({
            "any.required":"You must enter description",
            "string.min":"description must be at least 10 characters",
            "string.max":"description must be at Most 500 characters"
        }),
        address:Joi.string().min(3).max(100).required().messages({
            "any.required":"You must enter Address Of Place",
            "string.min":"address must be at least 3 characters",
            "string.max":"address must be at most 100 characters",
        }),
        location:Joi.object().required().keys({
            lat:Joi.number().required().messages({
                "any.required":"You must enter Latitude",
                "number.base":"You must enter Latitude"
            }),
            lng:Joi.number().required().messages({
                "any.required":"You must enter Longtitude",
                "number.base":"You must enter Latitude"
            })
        }).messages({
            "any.required":"You must Enter Location",
            "object.base":"Invalid location, Enter Longitude and latitude"
        })
    })
}

const updatePlaceValidSchema={
    body:Joi.object().required().keys({
        title:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]([._-\s]|[a-zA-Z0-9]){1,100}[a-zA-Z0-9]$/)).messages({
            "string.empty":"You must enter place Name",
            "string.pattern.base":`title must start with letter, contains letters, numbers and(. , - , _ , space) and underscore only. Name must be at least 3 characters, at maximum 100 characters`
        }),
        description:Joi.string().min(10).max(500).messages({
            "string.min":"description must be at least 10 characters",
            "string.max":"description must be at Most 500 characters"
        }),
        address:Joi.string().min(3).max(100).messages({
            "string.min":"address must be at least 3 characters",
            "string.max":"address must be at most 100 characters",
        }),
        location:Joi.object().keys({
            lat:Joi.number().messages({
                "number.base":"You must enter Latitude"
            }),
            lng:Joi.number().messages({
                "number.base":"You must enter Latitude"
            })
        }).messages({
            "object.base":"Invalid location, Enter Longitude and latitude"
        })
    }),
    params:Joi.object().required().keys({
        placeId:Joi.string().required().pattern(new RegExp(/^[a-fA-F0-9]{24}$/)).messages({
            "any.required":"Invalid Place ID",
            "string.pattern.base":"Invalid Place ID"
        })
    })
}

const PlaceIdValidSchema={
    params:Joi.object().required().keys({
        placeId:Joi.string().required().pattern(new RegExp(/^[a-fA-F0-9]{24}$/)).messages({
            "any.required":"Invalid Place ID",
            "string.pattern.base":"Invalid Place ID"
        })
    })
}

const getPlacesOfUserValidSchema={
    params:Joi.object().required().keys({
        userId:Joi.string().required().pattern(new RegExp(/^[a-fA-F0-9]{24}$/)).messages({
            "any.required":"Invalid User ID",
            "string.pattern.base":"Invalid User ID"
        })
    })
}

module.exports={addPlaceValidSchema,updatePlaceValidSchema,PlaceIdValidSchema,getPlacesOfUserValidSchema}