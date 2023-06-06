const asyncHandler = require("express-async-handler");

const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");
const Comment = require("../models/comments");
const { body, validationResult } = require("express-validator");
const Utility = require("../utility");
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
    // res.json({ author, post });
    res.status(201).json({
		status: "success",
		message: "Post created successfully.",
	  });
	
});

// single post detail
exports.detail = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).exec();
    const comment = await Comment.find({ post: req.params.id });
    res.json({ post, comment });
});

// modify a existing post, need validating and sanitizing inputs
exports.edit = asyncHandler(async (req, res) => {
    const update = Utility.emptyFields(req.body);
    console.log(req);

    const post = await Post.findByIdAndUpdate(req.params.id, update, {
        new: true,
    }).exec();
    await post.save();
    // res.json({ post });
    res.status(200).json({
		status: "success",
		message: "Blog post updated successfully.",
		post: post,
	  });
});
//api/post/6477f5a1e45bf7b562a23f95/edit
// after user confirm delete post
exports.delete = asyncHandler(async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id).exec();
    // res.json({ message: "Post deleted" });
    res.status(200).json({
		status: "success",
		message: "Blog post deleted.",
	  });
});
