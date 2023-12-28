const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Utility = require("../utility");
const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");

//GET for the front-end part that edit posts
exports.details = asyncHandler(async (req, res) => {
    //req.user to get the id save at user.js
    const [author, allPosts] = await Promise.all([
        BlogAuthor.findById(req.user.id).exec(),
        Post.find({ author: req.user.id }).exec(),
    ]);
    if (!author) {
        res.sendStatus(404).json({
            error: "Author not found",
            message: "The requested author does not exist in the database",
        });
    }
    res.json({ author: author, posts: allPosts });
});

exports.public_details = asyncHandler(async (req, res) => {
    const [author, allPosts] = await Promise.all([
        BlogAuthor.findById(req.params.id).exec(),
        Post.find({
            author: req.params.id,
            published: true,
        }).exec(),
    ]);
    if (!author) {
        res.sendStatus(404).json({
            error: "Author not found",
            message: "The requested author does not exist in the database",
        });
    }

    res.json({ name: author.name, posts: allPosts });
});

// POST new user API
exports.new_author = [
    body("user_name")
        .trim()
        .isLength({ max: 15, min: 3 })
        .withMessage("Must have a user name"),
    body("first_name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Must have a first name"),
    body("last_name").trim(),
    asyncHandler(async (req, res) => {
        const err = validationResult(req);
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
        if (!err.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.json({ errors: err.errors });
        } else {
            await author.save();
            res.status(201).json({
                status: "success",
                message: "Blog Owner created successfully.",
            });
        }
    }),
];

// POST for the front-end part that edit posts
exports.edit_details = [
    // sanitation
    body("user_name")
        .trim()
        .isLength({ max: 15, min: 3 })
        .withMessage("Must have a user name"),
    body("first_name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Must have a first name"),
    body("last_name").trim(),

    asyncHandler(async (req, res) => {
        const err = validationResult(req);
        const update = Utility.emptyFields(req.body);
        const author = await BlogAuthor.findByIdAndUpdate(req.user.id, update, {
            new: true,
        }).exec();
        if (!err.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.json({ errors: err.errors });
        } else {
            await author.save();
            res.status(200).json({
                status: "success",
                message: "Blog Owner updated successfully.",
            });
        }
    }),
];
