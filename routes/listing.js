const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require('multer')
const{storage}=require("../cloudConfig.js");
const { validate } = require("../models/review.js");
const upload =multer({storage});



router.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn, validateListing,upload.single('image'), wrapAsync(listingController.createListings));

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(isLoggedIn, wrapAsync(listingController.showListing))
.put( isLoggedIn, isOwner,upload.single('image'), validateListing, wrapAsync(listingController.updateListings))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListings));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports=router;