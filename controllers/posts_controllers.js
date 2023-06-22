const asyncHandler = require("express-async-handler");

const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");
const Comment = require("../models/comments");
const { body, validationResult } = require("express-validator");
const Utility = require("../utility");

exports.all_users_posts = asyncHandler(async (req, res) => {
    const authors = await BlogAuthor.find({}).exec();
    if (!authors) {
        res.send("authors not found in database");
    }
    const onePostPerAuthorPromises = authors.map(async (author) => {
        const post = await Post.findOne({ author: author._id, published: true })
            .populate("author")
            .exec();

        return post;
    });

    const onePostPerAuthor = await Promise.all(onePostPerAuthorPromises);
    if (!onePostPerAuthor) {
        res.send("Not post found in database");
    }

    res.json({ allPost: onePostPerAuthor });
});

// New post
exports.new = [
    body("title", "title must be specified.")
        .isLength({ max: 15, min: 3 })
        .trim(),
    body("text").trim(),
    asyncHandler(async (req, res) => {
        const err = validationResult(req);
        const author = await BlogAuthor.findById(req.user.id).exec();
        if (!author) {
            res.sendStatus(404).json({
                error: "Author not found",
                message: "The requested author does not exist in the database",
            });
        }

        const isPublished = req.body.published === "true";
        const post = new Post({
            title: req.body.title,
            author: req.user.id,
            text: req.body.text,
            published: isPublished,
        });
        if (!err.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.json({ errors: err.errors });
        } else {
            await post.save();

            res.status(201).json({
                status: "success",
                message: "Post created successfully.",
            });
        }
    }),
];

// single post detail
exports.detail = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
        res.sendStatus(404).json({
            error: "Post not found",
            message: "The requested post does not exist in the database",
        });
    }

    const comment = await Comment.find({ post: req.params.id });
    res.json({ post, comment });
});

exports.public_detail = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).exec();
    const author = await BlogAuthor.findById(post.author).exec();
    if (!post) {
        res.sendStatus(404).json({
            error: "Post not found",
            message: "The requested post does not exist in the database",
        });
    }
    console.log(author.name);
    const comment = await Comment.find({ post: req.params.id });
    res.json({ post, author: author.name, comment });
});

// modify a existing post, need validating and sanitizing inputs
exports.edit = asyncHandler(async (req, res) => {
    const update = Utility.emptyFields(req.body);

    const post = await Post.findByIdAndUpdate(req.params.id, update, {
        new: true,
    }).exec();

    if (!post) {
        res.sendStatus(404).json({
            error: "Post not found",
            message: "The requested post does not exist in the database",
        });
    }
    await post.save();
    res.status(200).json({
        status: "success",
        message: "Blog post updated successfully.",
        post: post,
    });
});
// after user confirm delete post
exports.delete = asyncHandler(async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id).exec();
    const comments = await Comment.find({ post: req.params.id }).exec();
    comments.forEach(async (comment) => {
        try {
            const toDel = await Comment.findByIdAndRemove(comment._id).exec();
        } catch (err) {
            console.log(err);
        }
    });

    res.status(200).json({
        status: "success",
        message: "Blog post deleted.",
    });
});
