//yaha pe pehle database ko khali kiya hai or usme data insert kiya hai or initdb ko call kiya hai.


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const dataWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("6985e0ea84017b94888458a7"),
  }));

  await Listing.insertMany(dataWithOwner);
  console.log("data was initialized");
};

initDB();
