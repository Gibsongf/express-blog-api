const express = require("express");
const router = express.Router();
const Post = require("../controllers/posts_controllers");
// const BlogAuthor = require("../controllers/blog_author_controllers");
// const Comment = require("../controllers/comments_controllers");


router.get("/", Post.all_posts);


module.exports = router;
