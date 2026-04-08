const Listing = require("../models/listing");

// INDEX
module.exports.index = async (req, res) => {
  let { search, category } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } }
    ];
  }

  if (category) {
    query.category = category;
  }

  const allListings = await Listing.find(query);

  res.render("listings/index.ejs", { allListings });
};
// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// SHOW
module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// CREATE LISTING

module.exports.createListings = async (req, res) => {
  try {
    // ✅ LOGIN CHECK
    if (!req.user) {
      req.flash("error", "You must be logged in!");
      return res.redirect("/login");
    }

    const listingData = req.body.listing;

    // ❌ agar data hi nahi aaya
    if (!listingData) {
      req.flash("error", "Invalid listing data!");
      return res.redirect("/listings/new");
    }

    // 🌍 GEO API CALL
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${listingData.location}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "wanderlust-app",
        },
      }
    );

    const geoData = await geoResponse.json();

    // ❌ invalid location
    if (!geoData || geoData.length === 0) {
      req.flash("error", "Location not found!");
      return res.redirect("/listings/new");
    }

    // ✅ coordinates extract
    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    listingData.geometry = {
      type: "Point",
      coordinates: [lon, lat],
    };

    // ✅ new listing
    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;

    // ✅ image upload (if exists)
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await newListing.save();

    // ✅ SUCCESS FLASH
    req.flash("success", "Successfully created a new listing!");
    res.redirect(`/listings/${newListing._id}`);

  } catch (err) {
    console.error(err);

    req.flash("error", "Something went wrong while creating listing!");
    res.redirect("/listings");
  }
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/uploads",
    "/uploads/w_200,h_120,c_fill"
  );

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// UPDATE
module.exports.updateListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
};

// DELETE
module.exports.deleteListings = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};