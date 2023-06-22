const express = require("express");
const router = express.Router();
const Post = require("../controllers/posts_controllers");
const BlogAuthor = require("../controllers/blog_author_controllers");
// const Comment = require("../controllers/comments_controllers");

// Here is api calls without auth, use
router.get("/", Post.all_users_posts);
router.get("/post/:id", Post.public_detail);
router.get("/author/:id", BlogAuthor.public_details);


module.exports = router;
