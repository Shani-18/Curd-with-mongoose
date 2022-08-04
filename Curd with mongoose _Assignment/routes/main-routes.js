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
  // } else {
  //   res.render("not-found", {
  //     pageTitle: "page not found",
  //     isAuthenticated: false,
  //   });
  // }
});

module.exports = router;
