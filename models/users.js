// schema for users
const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose =  require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema =  new Schema ({
    email : {
        type : String,
        required : true,
        unique: true,
        trim : true,
        lowercase: true
    },
});

userSchema.plugin(passportLocalMongoose);// for automatically implement usename and password
// hashing , salting and hashed password

 const User =  mongoose.model("User", userSchema);
 module.exports = User;