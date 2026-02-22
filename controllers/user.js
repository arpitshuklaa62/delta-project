const User = require("../models/user");

const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

const signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

const renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

const login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/listings");
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out!");
    res.redirect("/listings");
  });
};

module.exports = {
  renderSignupForm,
  signup,
  renderLoginForm,
  login,
  logout,
};
