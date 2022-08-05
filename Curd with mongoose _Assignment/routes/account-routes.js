const express = require("express");
const { check } = require("express-validator");

const {
  getSignUpForm,
  postSignUpForm,
  getSignInForm,
  postSignInForm,
  logOut,
} = require("../controllers/account-controllers");

const signInValidations = [
  check("email", "Invalid Email").isEmail().trim().escape().normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be 8 characters.")
    .matches("[0-9]")
    .withMessage("password must contain a number")
    .matches("[A-Z]")
    .withMessage("password must be contain uppercase letter")
    .trim()
    .escape(),
];
const signUpValidations = [
  check("firstName", "First Name is required.").notEmpty(),
  check("lastName", "Last Name is required.").notEmpty(),
  check("email", "Invalid Email")
    .isEmail()
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .escape()
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters.")
    .matches("[0-9]")
    .withMessage("Password must contain a number")
    .matches("[A-Z]")
    .withMessage("Password must be contain uppercase letter")
    .trim()
    .escape(),
];

const router = express.Router();
router.get("/signup", getSignUpForm);
router.post("/signup", signUpValidations, postSignUpForm);

router.get("/signin", getSignInForm);
router.post("/signin", signInValidations, postSignInForm);

router.get("/logout", logOut);

module.exports = router;
