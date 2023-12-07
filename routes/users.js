const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const BlogAuthor = require("../controllers/blog_author_controllers");
const bcrypt = require("bcrypt");
require("dotenv").config();

function saltPassword(req, res, next) {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            next();
        }
        req.body.password = hashedPassword;
        next();
    });
}

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.post("/register", saltPassword, BlogAuthor.new_author);
router.post("/login", function (req, res, next) {
    // console.log(req);
    passport.authenticate("local", { session: false }, (err, user, info) => {
        // console.log(user);
        if (err || !user) {
            return res.status(400).json({
                message: "Something is not right",
                user: user,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(
                { id: user._id, user_name: user.user_name },
                process.env.JwtKey
            );
            return res.json({ id: user._id, token });
        });
    })(req, res);
});

module.exports = router;
