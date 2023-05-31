// const createError = require('http-errors');
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

const BlogAuthor = require("./models/blog_author");
const apiRouter = require("./routes/api");
require("dotenv").config();
require("./passport");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", require("./routes/users"));
app.use("/api", passport.authenticate("jwt", { session: false }), apiRouter);

//connect to db
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}

module.exports = app;
