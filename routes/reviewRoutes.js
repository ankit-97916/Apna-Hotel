
const express = require("express");
// using merge params for extact the id of listing
const router = express.Router({mergeParams: true});

const MyError= require("../utils/myError.js");

const wrapAsync =  require("../utils/wrapAsync.js");
const {reviewSchema} = require("../joischema.js");
const {isLoggedin} = require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviewCon.js");






// validate review schema midllewares
const validateReviews = (req,res, next) => {
    let {error}  =  reviewSchema.validate(req.body);
    if(error){
     throw new MyError(400, error)
    } else {
        next();
     }
};

// review route post
router.post("/",isLoggedin, validateReviews, wrapAsync(reviewController.addReview));

// delete reviews new thing pull operator
router.delete("/:reviewId",isLoggedin,isReviewAuthor, wrapAsync(reviewController.deleteReview));


module.exports = router

