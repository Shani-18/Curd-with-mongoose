const customerModel = require("../models/customer");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

exports.getSignUpForm = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  res.render("formSignUp", {
    pageTitle: "Create our account",
    isAuthenticated: isAuthenticated,
    userType: "",
    errors: {
      firstNameErrors: "",
      lastNameErrors: "",
      emailErrors: "",
      passwordErrors: "",
    },
  });
};

exports.postSignUpForm = (req, res, next) => {
  const resultErrors = validationResult(req).errors;
  console.log(resultErrors);
  if (resultErrors.length === 0) {
    const model = new customerModel({
      _id: mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    model.save().then(res.redirect("/accounts/signin"));
  } else {
    const firstName = req.body.firstName;
    const isAuthenticated = req.session.isLoggedIn
      ? req.session.isLoggedIn
      : false;
    res.render("formSignUp", {
      pageTitle: "Create our account",
      isAuthenticated: isAuthenticated,
      userType: "",
      errors: {
        firstNameError: resultErrors.find(
          (firstNameError) => firstNameError.param === "firstName"
        )?.msg,
        lastNameError: resultErrors.find(
          (firstNameError) => firstNameError.param === "lastName"
        )?.msg,
        emailErrors: [
          ...resultErrors.filter(
            (firstNameError) => firstNameError.param === "email"
          ),
        ],
        passwordError: resultErrors.find(
          (firstNameError) => firstNameError.param === "password"
        )?.msg,
      },
    });
  }
};

exports.getSignInForm = (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  res.render("formSignIn", {
    pageTitle: "Login to your account",
    isAuthenticated: isAuthenticated,
    userType: "",
    errors: {
      firstNameErrors: "",
      lastNameErrors: "",
      emailErrors: "",
      passwordErrors: "",
    },
  });
};
exports.postSignInForm = (req, res, next) => {
  const resultErrors = validationResult(req).errors;
  if (resultErrors.length === 0) {
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
          res.redirect("/");
        } else {
          res.redirect("/accounts/signin");
        }
      });
  } else {
    const isAuthenticated = req.session.isLoggedIn
      ? req.session.isLoggedIn
      : false;
    res.render("formSignIn", {
      pageTitle: "Login to your account",
      isAuthenticated: isAuthenticated,
      userType: "",
      errors: {
        firstNameError: resultErrors.find(
          (firstNameError) => firstNameError.param === "firstName"
        )?.msg,
        lastNameError: resultErrors.find(
          (lastNameError) => lastNameError.param === "lastName"
        )?.msg,
        emailErrors: resultErrors.find(
          (emailErrors) => emailErrors.param === "email"
        )?.msg,
        passwordError: resultErrors.find(
          (passwordError) => passwordError.param === "password"
        )?.msg,
      },
    });
  }
};

exports.logOut = (req, res, next) => {
  res.status(200).clearCookie("connect.sid", {
    path: "/",
  });
  req.session.destroy();
  res.redirect("/accounts/signin");
};
