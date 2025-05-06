const express = require("express");
const router = express.Router();
const User =  require("../models/users.js");
const MyError= require("../utils/myError.js");
const wrapAsync =  require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController =  require("../controllers/usersCon.js");

// sign up 
router.get("/signup",userController.signUpForm);

router.post("/signup", wrapAsync(userController.SignUp)) ;

// login route
router.get("/login",userController.logInForm );

router.post("/login",saveRedirectUrl,
   passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
   }),userController.logIn);

//logout  req.logout() passport inbuild method
router.get("/logout", userController.logOut)

module.exports = router;
