const asyncHandler = require("express-async-handler");

const BlogAuthor = require('../models/blog_author')
const Post = require('../models/posts')

// all blog posts
exports.all_posts = asyncHandler(async (req,res)=>{
    // db get all posts
    const posts = await Post.find({},'title text timestamp').exec()
    if(!posts){
        res.send('Not post found in database')
    }
    res.json({posts});
})