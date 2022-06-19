// @ts-nocheck
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");

const login = (request, response, next) => {
    const { email, password } = request.body;
    User.findOne({ email }).then(foundUser => {
        if (foundUser) {
            bcryptjs.compare(password, foundUser.password).then(isMatched => {
                if (isMatched) {
                    jwt.sign({ id:foundUser._id,name: foundUser.name, email: foundUser.email, role: foundUser.role },
                        process.env.TOKEN_SECRET,
                        (error, token) => {
                            if (!error) {
                                response.status(200).json({message:"Successful Login",id:foundUser._id,token });
                            } else {
                                console.log(error)
                                const customError = new Error();
                                customError.statusCode = 500;
                                customError.message = "System Problem Occurred";
                                next(customError);
                            }
                        })
                } else {
                    const customError = new Error();
                    customError.statusCode = 401;
                    customError.message = "Email or Password isn't right";
                    next(customError);
                }
            })
        } else {
            const customError = new Error();
            customError.statusCode = 401;
            customError.message = "Email or Password isn't right";
            next(customError);
        }
    }).catch(error => {
        console.log(error)
        const customError = new Error();
        customError.statusCode = 500;
        customError.message = "System Problem Occurred";
        next(customError);
    })
}

module.exports = login;