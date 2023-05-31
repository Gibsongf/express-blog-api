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

// app.use(function (req, res, next) {
// 	res.locals.currentUser = req.user;
// 	console.log(res.locals)
// 	next();
// });

// app.get('/',(req,res)=>{
// 	res.render('index',{title:'Hello World'});
// })

// app.get('/log-in',(req,res)=>{
// 	res.render('log-in-form')
// })

// this can be deleted /user/login will replace it
// app.post("/log-in", function (req, res, next) {
// 	passport.authenticate("local", { session: false }, (err, user, info) => {
// 		user = user.toJSON()
// 		if (err || !user) {
// 			return res.status(400).json({
// 				message: "Something is not right",
// 				user: user,
// 			});
// 		}

// 		req.login(user, { session: false }, (err) => {
// 			if (err) {
// 				res.send(err);
// 			}
// 			// generate a signed son web token with the contents of user object and return it in the response
// 			const token = jwt.sign(user, "your_jwt_secret2");
// 			return res.json({ id:user._id, token });
// 		});
// 	})(req, res);
// });
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
