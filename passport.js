const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const BlogAuthor = require("./models/blog_author");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");
require("dotenv").config();

// When passport.authenticate('local') is in a router this will be executed
passport.use(
    new LocalStrategy(async (user_name, password, done) => {
        try {
            const user = await BlogAuthor.findOne({ user_name: user_name });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    // passwords match! log user in
                    return done(null, user);
                } else {
                    // passwords do not match!
                    return done(null, false, { message: "Incorrect password" });
                }
            });
        } catch (err) {
            return done(err);
        }
    })
);

// When passport.authenticate('jwt') is in a router this will be executed
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JwtKey,
        },
        async function (jwtPayload, cb) {
            try {
                const user = await BlogAuthor.findById(jwtPayload.id);
                const userData = { id: user._id, user_name: user.user_name };
                return cb(null, userData);
            } catch (err) {
                return cb(err);
            }
        }
    )
);
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
    try {
        const user = await BlogAuthor.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
