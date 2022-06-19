// @ts-nocheck
const Place = require("../../../models/Place")

const addNewPlace = (request, response, next) => {
    const { title, description, address, location } = request.body;
    const image = request.file?.filename;
    const creator = request.userInfo.id;
    const newPlace = new Place({ title, description, address, location, image, creator })
    newPlace.save().then(result => {
        response.json({message:"New Place is added successfully"})
    }).catch(error => {
        console.log(error)
        const customError = new Error();
        customError.statusCode = 500;
        customError.message = "System Problem Occurred";
        next(customError);
    })
}

module.exports = addNewPlace;