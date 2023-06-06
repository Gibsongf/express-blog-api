const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const BlogAuthor = require("./models/blog_author");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
// When passport.authenticate('local') is in a router this will be executed
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await BlogAuthor.findOne({ user_name: username });
			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}
			if (user.password !== password) {
				return done(null, false, { message: "Incorrect password" });
			}
			// console.log(user)
			return done(null, user);
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
			secretOrKey: "your_jwt_secret",
		},
		async function (jwtPayload, cb) {
			try {
				const user = await BlogAuthor.findById(jwtPayload.id);
				const userData = { id: user._id, user_name: user.user_name };
				return cb(null, userData);
			} catch (err) {
				

				return cb(err);
			}
			//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
			// return BlogAuthor.findOne(jwtPayload.id)
			// 	.then((user) => {
			// 		console.log(jwtPayload)
			// 		return cb(null, user);
			// 	})
			// 	.catch((err) => {
			// 		return cb(err);
			// 	});
		}
	)
);
passport.serializeUser(function (user, done) {
	// console.log(user);
	done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
	try {
		const user = await BlogAuthor.findById(id);
		// console.log(user);
		done(null, user);
	} catch (err) {
		done(err);
	}
});
