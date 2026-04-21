const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FORCE correct plugin import
const passportLocalMongooseModule = require("passport-local-mongoose");
const passportLocalMongoose = passportLocalMongooseModule.default || passportLocalMongooseModule;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  // ✅ optional but useful
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔐 plugin (adds username + password hash automatically)
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email" // ✅ login email se hoga (important)
});

module.exports = mongoose.model("User", userSchema);