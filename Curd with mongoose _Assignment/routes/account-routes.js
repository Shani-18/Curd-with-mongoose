const express = require("express");
// const validator = require("express-validator/check");
const {
  getSignUpForm,
  postSignUpForm,
  getSignInForm,
  postSignInForm,
  logOut,
} = require("../controllers/account-controllers");

const router = express.Router();
// validator.check("email").isEmail()
router.get("/signup", getSignUpForm);
router.post("/signup", postSignUpForm);

router.get("/signin", getSignInForm);
router.post("/signin", postSignInForm);

router.get("/logout", logOut);

module.exports = router;
