const express=require("express");

const authentication=require("../../middleWare/authentication");
const {addPlaceValidSchema, PlaceIdValidSchema,getPlacesOfUserValidSchema, updatePlaceValidSchema}=require("../places/places.validation")
const validation = require("../../middleWare/validation");
const addNewPlace = require("./controllers/addNewPlace");
const { multerUpload, multerValidFileTypes } = require("../../services/multerUpload");
const getAllPlaces = require("./controllers/getAllPlaces");
const getPlaceById = require("./controllers/getPlaceById");
const getPlacesByUserId = require("./controllers/getPlacesByUserId");
const deletePlaceById = require("./controllers/deletePlaceById");
const updatePlaceById = require("./controllers/updatePlaceById");

const placesRouter=express.Router();
const uploadPlaceImage=multerUpload(multerValidFileTypes.image,"upload/places/images").single("image");

placesRouter.post("/add-new-place",authentication,uploadPlaceImage,validation(addPlaceValidSchema),addNewPlace);
placesRouter.get("/get-all-places",authentication,getAllPlaces);
placesRouter.get("/place/:placeId",authentication,validation(PlaceIdValidSchema),getPlaceById);
placesRouter.delete("/place/:placeId",authentication,validation(PlaceIdValidSchema),deletePlaceById);
placesRouter.patch("/place/:placeId",authentication,uploadPlaceImage,validation(updatePlaceValidSchema),updatePlaceById);
placesRouter.get("/user/:userId",validation(getPlacesOfUserValidSchema),getPlacesByUserId);



module.exports=placesRouter;