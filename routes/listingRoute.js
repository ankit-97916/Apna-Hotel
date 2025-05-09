// restructuring listings
const express = require("express");
const router = express.Router();
const MyError = require("../utils/myError.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listingCon.js");

const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../joischema.js");
const multer =  require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// schema validation middlewares
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new MyError(400, error);
  } else {
    next();
  }
};

// extra
// router.route("/")
// .get( wrapAsync(listingController.root))
// .post(isLoggedin,upload.single("listing[image]"),validateListing,wrapAsync(listingController.new)) 


router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedin,upload.single("listing[image]"),validateListing,wrapAsync(listingController.new)) 

router.get("/new", isLoggedin, listingController.newForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  validateListing,
  isLoggedin,
  isOwner,
  upload.single("listing[image]"),
  wrapAsync(listingController.editsubmit)
)
 .delete(
  isLoggedin,
  isOwner,
  wrapAsync(listingController.deleteListing)
)

// edit route 2 step-
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.editform)
);

module.exports = router;
