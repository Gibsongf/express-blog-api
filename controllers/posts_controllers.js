const asyncHandler = require("express-async-handler");

const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");
const { body, validationResult } = require("express-validator");

// Remove empty field from obj
const emptyFields = (obj) => {
	const newObj = {}
	const keys = Object.keys(obj)
	keys.forEach(k => {
		if(obj[k].length > 0) return newObj[k] = obj[k]
	})
	return newObj
}
// all blog posts
exports.all_posts = asyncHandler(async (req, res) => {
	// db get all posts
	const posts = await Post.find(
		{ author: req.user.id },
		"title text timestamp"
	).exec();
	if (!posts) {
		res.send("Not post found in database");
	}
	res.json({ posts });
});

// New post
exports.new = asyncHandler(async (req, res) => {
	const author = await BlogAuthor.findById(req.user.id).exec();
	const post = new Post({
		title: req.body.title,
		author: req.user.id,
		text: req.body.text,
	});
	await post.save();
	res.json({ author, post });
});

// single post detail
exports.detail = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id).exec();
	res.json({ post });
});

// modify a existing post, need validating and sanitizing inputs
exports.edit = asyncHandler(async (req, res) => {
	const update = emptyFields(req.body);
	const post = await Post.findByIdAndUpdate(req.params.id,update,{
		new: true
	  }).exec();
	await post.save()

	res.json({ post });
});

// after user confirm delete post
exports.delete = asyncHandler(async (req, res) => {
	const post = await Post.findByIdAndRemove(req.params.id).exec();
	res.json({ message: "Post deleted" });
});
