const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FORCE correct plugin import (works in all Node versions)
const passportLocalMongooseModule = require("passport-local-mongoose");
const passportLocalMongoose = passportLocalMongooseModule.default || passportLocalMongooseModule;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});
 

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
