const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Utility = require("../utility");

const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");

//GET for the front-end part that edit posts
exports.details = asyncHandler(async (req, res) => {
	// console.log("req user:", req.user);
	const author = await BlogAuthor.findById(req.user.id).exec();
	if (!author) {
        res.sendStatus(404).json({
            error: "Author not found",
            message: "The requested author does not exist in the database",
        });
    }
	const allPosts = await Post.find({ author: req.user.id }).exec();
	res.json({ author: author, posts: allPosts });
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
	await author.save();
	// res.json({ message: "Post deleted" });
	res.sendStatus(201);
});
exports.author_posts = asyncHandler(async (req, res) => {});

// POST for the front-end part that edit posts
exports.edit_details = [
	// sanitation
	body("user_name", "Must have a user name").isLength({ max: 15 }).trim(),
	body("first_name", "Must have a first name").isLength({ min: 3 }).trim(),
	body("last_name", "").trim(),
	body("description", "").trim(),

	asyncHandler(async (req, res) => {
		const update = Utility.emptyFields(req.body);
		const author = await BlogAuthor.findByIdAndUpdate(req.user.id, update, {
			new: true,
		}).exec();
		await author.save();
		res.status(200).json({
			status: "success",
			message: "Blog Owner updated successfully.",
			author,
		});
	}),
];
