const Review =  require("../models/reviews.js");
const Listing =  require("../models/listing.js");

// add review controller
module.exports.addReview = async (req,res)=> {
    let listing =  await Listing.findById(req.params.id);
    let newReview =  new Review(req.body.review);
    newReview.author = req.user._id;
   console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("succes", "New Review add");
    res.redirect(`/listings/${listing._id}`); 
};
// delete reviews
module.exports.deleteReview = async(req,res) => {
    let {id, reviewId} = req.params;
    console.log(id, reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("succes", "Review Delete"); 
    res.redirect(`/listings/${id}`);
};