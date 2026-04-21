const Listing = require("../models/listing");

// INDEX
module.exports.index = async (req, res) => {
  let { search, category, roomType, furnishing, rent } = req.query;

  let query = {};

  // 🔎 SEARCH
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } }
    ];
  }

  // 🏷 CATEGORY FILTER
  if (category) {
    query.category = category;
  }

  // 🛏 ROOM TYPE FILTER
  if (roomType) {
    query.roomType = roomType;
  }

  // 🛋 FURNISHING FILTER
  if (furnishing) {
    query.furnishing = furnishing;
  }

  // 💰 PRICE RANGE FILTER
  if (rent) {
    const range = rent.split("-");

    if (range.length === 2) {
      const min = parseInt(range[0]);
      const max = parseInt(range[1]);

      query.price = {
        $gte: min,
        $lte: max,
      };
    }
  }

  // DATABASE QUERY
  const allListings = await Listing.find(query).sort({ price: 1 });

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
    if (!req.user) {
      req.flash("error", "You must be logged in!");
      return res.redirect("/login");
    }

    const listingData = req.body.listing;

    if (!listingData) {
      req.flash("error", "Invalid listing data!");
      return res.redirect("/listings/new");
    }

    // GEO LOCATION API
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${listingData.location}&format=json&limit=1`,
      {
        headers: { "User-Agent": "wanderlust-app" },
      }
    );

    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      req.flash("error", "Location not found!");
      return res.redirect("/listings/new");
    }

    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    listingData.geometry = {
      type: "Point",
      coordinates: [lon, lat],
    };

    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;

    if (req.files && req.files.length > 0) {
      newListing.images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
      }));
    }

    await newListing.save();

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

  res.render("listings/edit.ejs", { listing });
};

// UPDATE
module.exports.updateListings = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (req.files && req.files.length > 0) {
    listing.images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }));
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