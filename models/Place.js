const mongoose = require("mongoose");
const User = require("./User");
const DBSchema = mongoose.Schema;
const fs= require("fs");
const path = require("path");


const placeSchema = new DBSchema({
    title: {
        type: DBSchema.Types.String,
        required: true,
    },
    description: {
        type: DBSchema.Types.String,
        required: true,
    },
    image: DBSchema.Types.String,
    address: {
        type: DBSchema.Types.String,
        required: true
    },
    location: {
        type: new DBSchema({
            lat: {
                type: DBSchema.Types.Number,
                required: true
            },
            lng: {
                type: DBSchema.Types.Number,
                required: true
            }
        }),
        required: true
    },
    creator: {
        type: DBSchema.Types.ObjectId,
        ref: "User"
    }
})

placeSchema.pre("save",async function(next){
    try{
        // console.log(this.creator)
        const result=await User.findByIdAndUpdate(this.creator,{$inc:{placesCount:1}})
        // console.log(result)
        next();
    }catch(error){
        console.log(error)
    }
})

//reduce places count that user created
placeSchema.pre("findOneAndDelete",async function(next){
    try{
        // console.log(this.getQuery().creator) 
        const result=await User.findByIdAndUpdate(this.getQuery().creator,{$inc:{placesCount:-1}})
        // console.log(result);
        next();
    }catch(error){
        console.log(error)
    }
})

//Delete image file itself after deleting the place from database
placeSchema.post("findOneAndDelete",async function(result,next){
    try{
        if(result.image){
            fs.unlink(path.join(__dirname, "../upload/places/images/")+result.image,(error)=>{
                if(error){
                        console.log("Error occurred during file delete: "+error)
                    }else{
                        console.log("image of the place is deleted")
                    }
            })
        }
        next();
    }catch(error){
        console.log(error)
    }
})

placeSchema.post("find",async function(result,next){
    console.log("after find Operation: "+result)
    // try{
    //     next();
    // }catch(error){
    //     console.log(error)
    // }
})

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;