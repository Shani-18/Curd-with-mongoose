const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mainRoutes = require("./routes/main-routes");
const shoppingRoutes = require("./routes/shopping-routes");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

// creating MongoDB Store
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/store-sessions",
  collection: "sessions",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "Secrete key identifier",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/shopping", shoppingRoutes);
app.use(mainRoutes);

// set 404 page
app.use((req, res, next) => {
  const isAuthenticated = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  res.render("not-found", {
    pageTitle: "Page not found!",
    isAuthenticated: isAuthenticated,
  });
});

mongoose.connect("mongodb://localhost:27017/4051", () => {
  console.log("MonogoDB successfully connected!");
  app.listen(4000, () => {
    console.log("Started listening at port 4000.");
  });
});
