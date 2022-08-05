const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  const userType = req.session.userType;
  // if (isAuthenticated) {
  res.render("index", {
    pageTitle: "My Store",
    isAuthenticated: isAuthenticated,
    userType,
  });
});

module.exports = router;
