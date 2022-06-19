const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require('cors')
const fs= require("fs");

const DBConnection = require("./DB/DBConnection");
const modulesRouter = require("./modules/index.router");

const app = express();
const corsOptions = {
    origin: "*",
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS']
}
app.use(cors(corsOptions))
// app.use((request, response, next) => {
//     response.setHeader("Access-Control-Allow-Origin", "*");
//     response.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept,Authorization"
//     );
//     response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, PATCH, DELETE")
//     next();
// })
app.use(express.json())
app.use("/places/images", express.static(path.join(__dirname, "./upload/places/images")))
app.use("/users/images", express.static(path.join(__dirname, "./upload/users/images")))


// Web Application Routing
app.use("/auth", modulesRouter.authRouter);
app.use("/users", modulesRouter.usersRouter);
app.use("/places", modulesRouter.placesRouter);
app.use("*", (request, response, next) => {
    response.status(404).json({ message: "Invalid URL" })
});

app.use((customError, request, response, next) => {
    if(request.file){
        fs.unlink(request.file.path,(error)=>{
            if(error){
                console.log("Error occurred during file delete: "+error)
            }else{
                console.log("image of the place is deleted")
            }
        })
    }
    response.status(customError.statusCode || 400)
        .json({ message: customError.message || "Invalid Operation" });
});

DBConnection.then(result => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is Running on port ${process.env.PORT}....`)
    })
}).catch(error => {
    console.log("Database Problem: Unable to connect to MongoDB database....")
    console.log("Error in details: " + error)
})