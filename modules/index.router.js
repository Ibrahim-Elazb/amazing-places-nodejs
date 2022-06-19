const usersRouter=require("../modules/users/users.router");
const placesRouter=require("../modules/places/places.router");
const authRouter=require("../modules/auth/auth.router");

const modulesRouter={usersRouter,placesRouter,authRouter}
module.exports=modulesRouter;