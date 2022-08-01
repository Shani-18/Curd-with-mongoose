const express = require("express");
const validator = require("express-validator/check");

const router = express.Router();

router.get("/signup", getSignUpForm);
router.post("/signup", validator.check("email").isEmail(), postSignUpForm);

router.get("/signin", getSignInForm);
router.post("/signin", postSignInForm);

module.exports = router;
