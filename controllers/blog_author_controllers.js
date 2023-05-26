const asyncHandler = require("express-async-handler");

const BlogAuthor = require("../models/blog_author");
const Post = require("../models/posts");

// WE NEED TO CREATE A BLOG AUTHOR AT DB AND THEN DO THE LOGIN HERE I GUESSING
// home of the blog author

//GET
exports.details = asyncHandler(async (req, res) => {
	//need to pass some auth to get it
	const details = await BlogAuthor.find({}).exec();
	res.json(details);
});

//POST
exports.edit = asyncHandler(async (req, res) => {
	const authorDetails = await BlogAuthor.find({}).exec();
	const body_keys = Object.keys(req.body);
	const blog_author = new BlogAuthor({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		description: req.body.description,
		age: req.body.age,
		_id: authorDetails._id,
	});
    console.log(authorDetails.url)
	body_keys.forEach((k) => {
		if (req.body[k].length < -1) {
			console.log(req.body[k]);
		}
	});
	res.json({ name: "okay" });
});
