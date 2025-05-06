// middle for check user is logged in or not
// isAuthenticated() passport method
const Listing  = require("./models/listing");
const Review  = require("./models/reviews");

module.exports.isLoggedin =  (req, res, next) => {
    if(!req.isAuthenticated()){
        // redirect to original path (url)
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", " You must be logged in to create listings");
        return res.redirect("/login");
    }
    next();
}
// middleare for save redirect url
// convert req.session.redirecturl =  res.locals.redirecturl
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
     let listing =  await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "you dont have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params;
     let review =  await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "you dont have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

