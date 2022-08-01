const express = require("express");

const router = express.Router();

router.get("/home", (req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  if (isAuthenticated) {
    res.render("index", {
      pageTitle: "My Store",
      isAuthenticated: true,
    });
  } else {
    res.render("not-found", {
      pageTitle: "page not found",
      isAuthenticated: false,
    });
  }
});

module.exports = router;
