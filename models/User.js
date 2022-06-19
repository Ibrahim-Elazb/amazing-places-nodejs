// @ts-nocheck
const bcryptjs=require("bcryptjs");
const mongoose=require("mongoose");
const DBSchema=mongoose.Schema;


const userSchema=new DBSchema({
    name:{
        type:DBSchema.Types.String,
        required:true,
    },
    email:{
        type:DBSchema.Types.String,
        required:true,
        unique:true
    },
    password:{
        type:DBSchema.Types.String,
        required:true,
    },
    role:{
        type:DBSchema.Types.String,
        default:"user"
    },
    image:DBSchema.Types.String,
    placesCount:{
        type:DBSchema.Types.Number,
        default:0
    }
},
{ 
    timestamps: true
 })

userSchema.pre("save",async function(next){
    this.password=await bcryptjs.hash(this.password,+process.env.SALT_ROUND);
    next();
})

const User=mongoose.model("User",userSchema);
module.exports=User;

