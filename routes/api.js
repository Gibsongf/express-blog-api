const express = require("express");
const router = express.Router();
const Post = require("../controllers/posts_controllers");
const BlogAuthor = require("../controllers/blog_author_controllers");
const Comment = require("../controllers/comments_controllers");

//Blog Author
router.get("/blog-owner", BlogAuthor.details);
router.put("/blog-owner/edit", BlogAuthor.edit_details);

//Posts
router.get("/posts", Post.all_posts);
// New post
router.post("/post", Post.new);
//Individual post
router.get("/post/:id", Post.detail);

router.put("/post/:id/edit", Post.edit);
router.delete("/post/:id", Post.delete);

//Comment. this will be protected or not ?
// New comment at specific post
router.post("/post/:id/comment", Comment.new);
router.delete("/post/:id/comment/:commentID", Comment.delete);

module.exports = router;
