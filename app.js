if(process.env.NODE_ENV != "production"){
  require('dotenv').config();

}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const listingsRouter = require("./routes/listingRoute.js");
const reviwsRouter = require("./routes/reviewRoutes.js");
const userRouter = require("./routes/userroute.js");

const session = require("express-session"); 
const MongoStore = require('connect-mongo');
const  flash = require('connect-flash');
const passport =  require("passport");
const LocalStrategy =  require("passport-local");
const User =  require("./models/users.js");
const dbUrl =  process.env.ATLAS_URL;// use atls mongodb cloud link to connect cloud


const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("./joischema.js");

main()
  .then((res) => {
    console.log("successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl); // connect cloud database not local
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static('public'));

// connect mongo package use process 
const store =  MongoStore.create({
  mongoUrl : dbUrl,
  crypto: {
    secret : process.env.SECRET,

  },
  touchAfter: 24*3600,
});
store.on("error", (err) => {
  console.log("ERROR IN MONGO SESSION STORE",err);
})

// session option 
const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized : true,
  cookie: {
    expires: Date.now() + 6 * 24 * 60 * 60* 1000,
    maxAge: 6 * 24 * 60 * 60* 1000,
    httpOnly: true,
  }
};
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middlewraes for flash sms
app.use((req,res, next)=> {
  res.locals.msg = req.flash("succes");
  res.locals.err = req.flash("error");
  res.locals.currUser = req.user;
  next();
});
app.post("/search", async (req, res) => {
  let { query } = req.body;

  // Trim and convert to lowercase for case-insensitive comparison
  query = query.trim().toLowerCase();

  const allListings = await Listing.find({});
  
  // Filter manually based on exact/partial match without regex
  const filteredListings = allListings.filter(listing => {
    return (
      listing.location.toLowerCase().includes(query) ||
      listing.country.toLowerCase().includes(query)
    );
  });

  res.render("listings/searchREsults", { listings: filteredListings });
});


app.get  ("/", listingsRouter)
// for new user route
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviwsRouter);
app.use("/", userRouter)

// error handling middle wares-
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Errors Occured" } = err;
  res.render("error.ejs", { message });
});


//custom server
app.listen(3000, () => {
  console.log(`port is working 3000`);
});
