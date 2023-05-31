const asyncHandler = require("express-async-handler");

const BlogAuthor = require('../models/blog_author')
const Post = require('../models/posts')
const { body, validationResult } = require("express-validator");

// all blog posts
exports.all_posts = asyncHandler(async (req,res)=>{
    // db get all posts
    const posts = await Post.find({"author":req.user.id},'title text timestamp').exec()
    if(!posts){
        res.send('Not post found in database')
    }
    res.json({posts});
})

// New post
exports.new = asyncHandler(async (req,res)=>{
    const author = await BlogAuthor.findById(req.user.id).exec();
    const post = new Post({
        title:req.body.title,
        author:req.user.id,
        text: req.body.text
    })
    await post.save()
    res.json({author,post})
})

// single post detail
exports.detail = asyncHandler(async (req,res)=>{
    const post = await Post.findById(req.params.id).exec();
    res.json({post})
})

// modify a existing post
exports.edit = asyncHandler(async (req,res)=>{
    const post = await Post.findById(req.params.id).exec();
    res.json({post})
})

// after user confirm delete post
exports.delete = asyncHandler(async (req,res)=>{
    const post = await Post.findByIdAndRemove(req.params.id).exec();
    res.json({message:'Post deleted'})
})