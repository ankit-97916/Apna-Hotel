// user backend core
const User = require("../models/users.js");
module.exports.signUpForm = (req , res) => {
    res.render("users/signup.ejs");
 }

// user sign up 
module.exports.SignUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("succes", "Welcome to Apna Hotel");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// login in form 
module.exports.logInForm = (req,res)=> {
    res.render("users/login.ejs")
 }

 // login 
 module.exports.logIn = async(req,res)=> {
    req.flash("succes","Congrats! you are logged in");
    let redirectUrl =  res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// logout

module.exports.logOut = (req,res,next) => {
    req.logout((err)=> {
       if(err){
        return  next(err)
       }
       req.flash("succes", "you are logged out");
       res.redirect("/listings");
    })
 }
