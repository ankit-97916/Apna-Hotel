const mongoose = require('mongoose');
const Review = require('./reviews.js');
const Schema = mongoose.Schema;


const listingSchema = new Schema({
   title : {
      type : String,
      required : true,
      trim: true
   } ,
   description: {
    type : String,
    required : true,
    trim: true
   },
   image : {
      url: String,
      filename: String
   },
   category : {
      type : String,
      enum: []
   },

   price: {
    type : Number,
    required : true,
   },

   location: {
    type : String,
    required : true,
    trim: true
   },
   country : {
    type : String,
    required : true,
    trim: true
   },
   

   reviews : [
      {type: Schema.Types.ObjectId,
         ref: "Review",
      },
   ],
   owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
   },
   // category: {
   //    type: String,
   //    enum: ["mountains", "farms", "arctic", "deserts"]
   // }
});

// mongoose middle wares
listingSchema.post("findOneAndDelete", async (listing)=> {
   if(listing){
      await Review.deleteMany({_id: {$in: listing.reviews}})
   }
});

const Listing =  mongoose.model("Listing", listingSchema);
module.exports = Listing;
