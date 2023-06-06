const asyncHandler = require("express-async-handler");

const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");
const Comment = require("../models/comments");

const { body, validationResult } = require("express-validator");

// post new comment
exports.new = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if(!post){
        res.sendStatus(404).json({
            "error": "Post not found",
            "message": "The requested post does not exist in the database"
          }); 
    }
    const comment = new Comment({
        user_name:req.body.user_name,
        text:req.body.comment_text,
        post:req.params.id
    })
    await comment.save()
    // res.json({post,comment})
    res.sendStatus(201).json({
		status: "success",
		message: "New comment created",
        comment
	  });
});

exports.delete = asyncHandler(async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.commentID);
	res.status(200).json({
		status: "success",
		message: "Post comment deleted.",
	  });
});
