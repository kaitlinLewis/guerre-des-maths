const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const problemRoutes = require("./routes/problems");
const solutionRoutes = require("./routes/solutions");

// Use .env in config folder
require("dotenv").config({ path: "./config/.env" });

//Use Passport in config folder
require("./config/passport")(passport);

//Connect to Database
connectDB();

//Use EJS for views
app.set("view engine", "ejs");

//Declare public as Static folder
app.use(express.static("public"));

//Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Method override to use form for put && delete
app.use(methodOverride("_method"));

//Logging
app.use(logger("dev"));

//Setup sessions - stored in MongoDB
app.use(
  session({
    secret: "secretsdontmakefriends",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, etc
app.use(flash());

//Routes for server to listen to
app.use("/", mainRoutes);
app.use("/problems", problemRoutes);
app.use("/solutions", solutionRoutes);

//Run server
app.listen(process.env.PORT, () => {
  console.log("Server is up and running!");
});
