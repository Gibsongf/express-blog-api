const asyncHandler = require("express-async-handler");

const Post = require("../models/posts");
const Comment = require("../models/comments");

const { body, validationResult } = require("express-validator");

// post new comment
exports.new = [
    body("user_name", "user name must be specified.")
        .isLength({ max: 15, min: 3 })
        .trim(),
    body("comment_text", "comment cant be empty").isLength({ min: 3 }).trim(),
    asyncHandler(async (req, res) => {
        const err = validationResult(req);
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.sendStatus(404).json({
                error: "Post not found",
                message: "The requested post does not exist in the database",
            });
        }
        const comment = new Comment({
            user_name: req.body.user_name,
            text: req.body.comment_text,
            post: req.params.id,
        });
        if (!err.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.json({ errors: err.errors });
        } else {
            await comment.save();
            res.sendStatus(201).json({
                status: "success",
                message: "New comment created",
                comment,
            });
        }
    }),
];

exports.delete = asyncHandler(async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.commentID);
    res.status(200).json({
        status: "success",
        message: "Comment deleted.",
    });
});
