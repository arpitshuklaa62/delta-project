require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/listing');

mongoose.connect(process.env.ATLASDB_URL).then(async () => {
  const count = await Listing.countDocuments();
  console.log('Total listings:', count);

  const listings = await Listing.find({}).select('title images').limit(5);
  listings.forEach((l, i) => {
    console.log(`${i+1}. ${l.title}: images=${l.images ? l.images.length : 0}`);
    if (l.images && l.images.length > 0) {
      console.log('   First image:', l.images[0].url);
    }
  });

  mongoose.connection.close();
}).catch(console.error);