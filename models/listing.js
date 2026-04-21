const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  // Hostel fields
  gender: {
    type: String,
    enum: ["Boys", "Girls", "Both"],
    required: true
  },
  roomType: {
    type: String,
    enum: ["Single", "Double", "Triple"],
    required: true
  },

  // ✅ FIXED (only once + default added)
  amenities: {
    type: [String],
    default: []
  },
  reviews: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }
],

  images: [{
    url: String,
    filename: String
  }],

  description: String,

  // Geometry for maps (GeoJSON format)
  geometry: {
    geoJsonType: {
      type: String,
      enum: ['Point']
    },
    coordinates: [Number]
  },

  // Owner
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });


module.exports = mongoose.model("Listing", listingSchema);