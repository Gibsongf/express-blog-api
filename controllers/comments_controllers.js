const asyncHandler = require("express-async-handler");

const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");
const Comment = require("../models/comments");

const { body, validationResult } = require("express-validator");

// post new comment
exports.new = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const comment = new Comment({
        user_name:req.body.user_name,
        text:req.body.comment_text,
        post:req.params.id
    })
    await comment.save()
    // res.json({post,comment})
    res.sendStatus(201)
});

exports.delete = asyncHandler(async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.commentid);
	res.sendStatus(200)
});
