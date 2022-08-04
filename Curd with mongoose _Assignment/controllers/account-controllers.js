const customerModel = require("../models/customer");
const mongoose = require("mongoose");

exports.getSignUpForm = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  res.render("formSignUp", {
    pageTitle: "Create our account",
    isAuthenticated: isAuthenticated,
    userType: "",
  });
};

exports.postSignUpForm = (req, res, next) => {
  const model = new customerModel({
    _id: mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  model.save().then(res.redirect("/accounts/signin"));
};

exports.getSignInForm = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  res.render("formSignIn", {
    pageTitle: "Login to your account",
    isAuthenticated: isAuthenticated,
    userType: "",
  });
};
exports.postSignInForm = (req, res, next) => {
  customerModel
    .findOne({
      email: req.body.email,
      password: req.body.password,
    })
    .then((customer) => {
      if (customer) {
        req.session.isLoggedIn = true;
        req.session.user = customer;
        req.session.userType = req.body.userType;
        res.redirect("/home");
      } else {
        res.redirect("/accounts/signin");
      }
    });
};

exports.logOut = (req, res, next) => {
  res.status(200).clearCookie("connect.sid", {
    path: "/",
  });
  req.session.destroy();
  res.redirect("/accounts/signin");
};
