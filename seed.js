require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const initData = require("./init/data");

const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

const seedDB = async () => {
  await Listing.deleteMany({});

  await Listing.insertMany(initData);

  console.log("Data inserted successfully!");
};

seedDB().then(() => {
  mongoose.connection.close();
});