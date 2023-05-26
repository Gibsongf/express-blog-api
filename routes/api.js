const express = require('express');
const router = express.Router();
const Post = require('../controllers/posts_controllers')
const BlogAuthor = require('../controllers/blog_author_controllers')


router.get('/', BlogAuthor.details);

router.post('/edit', BlogAuthor.edit);

module.exports = router;
