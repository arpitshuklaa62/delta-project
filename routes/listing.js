const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// 🔍 Escape regex
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


// ================= INDEX =================
router.get("/", async (req, res, next) => {
  console.log('INDEX ROUTE HIT');
  try {
    const { search, gender, roomType, price } = req.query;

    if (search && search.trim()) {
      const safeSearch = escapeRegex(search.trim());

      const listing =
        await Listing.findOne({ title: { $regex: safeSearch, $options: "i" } }) ||
        await Listing.findOne({ location: { $regex: safeSearch, $options: "i" } });

      if (listing) {
        return res.redirect(`/listings/${listing._id}`);
      }

      req.flash("error", "Hostel not found");
      return res.redirect("/listings");
    }

    let filter = {};

    if (gender) filter.gender = gender;
    if (roomType) filter.roomType = roomType;
    if (price) filter.price = { $lte: price };

    const allListings = await Listing.find(filter);

    res.render("listings/index", { allListings });

  } catch (err) {
    next(err);
  }
});


// ================= NEW =================
router.get("/new", (req, res) => {
  res.render("listings/new");
});


// ================= CREATE (🔥 FIXED WITH MAP DATA) =================
router.post("/", upload.array("images"), async (req, res, next) => {
  try {

    if (!req.body || !req.body.listing) {
      return res.send("Form data missing");
    }

    const newListing = new Listing(req.body.listing);

    // owner
    if (req.user) {
      newListing.owner = req.user._id;
    }

    // images
    if (req.files && req.files.length > 0) {
      newListing.images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
      }));
    }

    // 🗺️ FIX: GEO LOCATION (IMPORTANT FOR MAP)
    newListing.geometry = {
      type: "Point",
      coordinates: [77.4126, 23.2599] // Indore default (replace later with real API)
    };

    await newListing.save();

    res.redirect("/listings");

  } catch (err) {
    next(err);
  }
});


// ================= EDIT =================
router.get("/:id/edit", async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  res.render("listings/edit", {
    listing
  });
});


// ================= UPDATE =================
router.put("/:id", upload.array("images"), async (req, res) => {
  try {
    let data = req.body.listing;

    if (data.amenities && !Array.isArray(data.amenities)) {
      data.amenities = [data.amenities];
    }

    const listing = await Listing.findById(req.params.id);

    // Update other fields
    Object.assign(listing, data);

    // Handle images
    if (req.files && req.files.length > 0) {
      listing.images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
      }));
    }

    await listing.save();

    res.redirect(`/listings/${req.params.id}`);

  } catch (err) {
    console.log(err);
    res.send("Error updating listing");
  }
});


// ================= SHOW =================
router.get("/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" }
    })
    .populate("owner");

  res.render("listings/show", { listing });
});


// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.redirect("/listings");
});


module.exports = router;