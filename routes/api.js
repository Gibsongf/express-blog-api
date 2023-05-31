const express = require("express");
const router = express.Router();
const Post = require("../controllers/posts_controllers");
const BlogAuthor = require("../controllers/blog_author_controllers");
const Comment = require("../controllers/comments_controllers");


//Blog Author
router.get("/blog-author", BlogAuthor.details);
router.post("/blog-author/edit", BlogAuthor.edit_details);

//Posts
router.post("/posts", Post.all_posts);
router.post("/new-post", Post.new);

router.get("/post/:id", Post.detail);
router.get("/post/:id/new-comment", Post.detail);

// PUT
router.get("/post/:id/edit", Post.edit);

router.delete("/post/:id", Post.delete);

router.get("/protected", (req, res) => {
	res.send("You are authorized");
});




//Comment. this will be protected or not ?
router.post("/post/:id/new-comment", Comment.new);
router.delete("/post/:id/comment/:commentid", Comment.delete);



module.exports = router;
