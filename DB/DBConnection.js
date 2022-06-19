const { default: mongoose } = require("mongoose");

const DBConnection=mongoose.connect(`${process.env.DATABASE_NAME}`);

module.exports=DBConnection;