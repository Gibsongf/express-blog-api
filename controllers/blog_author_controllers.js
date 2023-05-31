const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");

//GET for the front-end part that edit posts
exports.details = asyncHandler(async (req, res) => {
	// console.log("req user:", req.user);
	const author = await BlogAuthor.findById(req.user.id).exec();
	const allPosts = await Post.find({ author: req.user.id }).exec();
	res.json({ author_details: author, posts: allPosts });
});

// POST new user API
exports.new_author = asyncHandler(async (req, res) => {
	const { user_name, password, first_name, last_name, description, age } =
		req.body;
	const author = new BlogAuthor({
		user_name: user_name,
		password: password,
		first_name: first_name,
		last_name: last_name,
		description: description,
		age: age,
	});
	// console.log(author);
	await author.save();
	res.send("New Account Created");
});
exports.author_posts = asyncHandler(async (req, res) => {});

// POST for the front-end part that edit posts
exports.edit_details = [
	body("first name", "Must have a first name").isLength({ min: 3 }),
	asyncHandler(async (req, res) => {
		console.log(req.user);
		const authorDetails = await BlogAuthor.findById(req.user.id).exec();
		// const replaceEmpty = () => {
		// 	const keys = Object.keys(authorDetails);
		// 	keys.forEach((k) => {
		// 		if (req.body[k] !== undefined) {
		// 			if (req.body[k].length < 1) {
		// 				req.body[k] = authorDetails[k];
		// 			}
		// 		}
		// 	});
		// };
		// replaceEmpty();
		console.log(req.body);
		const blog_author = new BlogAuthor({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			description: req.body.description,
			age: req.body.age,
			_id: authorDetails._id,
		});
		console.log(authorDetails);
		res.json({ blog_author });
	}),
];
