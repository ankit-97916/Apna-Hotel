// storing a backened core

const Listing =  require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN;


// index for show all listings
module.exports.index = async (req,res)=> {
    let allData =  await Listing.find();   
       res.render("listings/home.ejs", {allData});
};

module.exports.root = async (req,res)=> {
    let allData =  await Listing.find();   
       res.render("listings/home.ejs", {allData});
};

// new listing form
module.exports.newForm = (req,res, next)=> {
    console.log(req.user);
     res.render("listings/new.ejs");
};

// for create new  listing
module.exports.new = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename)
    let newLIsting = new Listing(req.body.listing); 
    console.log(req.user)
    newLIsting.owner =  req.user._id;  
    newLIsting.image  = {url, filename}      
    await newLIsting.save();
    req.flash("succes", "new listing created");
    res.redirect("/listings");

};
// edit in 2 steps
// for to get edit form 
module.exports.editform = async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    } 
      let originalImageUrl = listing.image.url;
      originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
      res.render("listings/edit.ejs",{listing,originalImageUrl});
     
};

// submit edit
module.exports.editsubmit = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("succes", "listing is updated");
   res.redirect(`/listings/${id}`);   
};


// show indivisual listing. read operation.
module.exports.showListing = async ( req, res)=> {
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({path: "reviews",populate: {path: "author"}})
    .populate("owner");
    console.log(listing)
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    } else {
        res.render("listings/show.ejs",{listing});
    }
};

// delete listing
module.exports.deleteListing = async(req, res) => {
        let {id} = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("succes", "Listiing delete");
        res.redirect("/listings");
    };