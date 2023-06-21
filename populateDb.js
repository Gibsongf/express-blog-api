require("dotenv").config();

const BlogAuthor = require("./models/blog_author");
const Post = require("./models/posts");
const Comment = require("./models/comments");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;

// a new post function to be push to the author new model and add username password to the model
async function createComment(post, user_name) {
    const comment = new Comment({
        user_name: user_name,
        text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        post: post._id,
    });
    await comment.save();
    console.log("Comment created");
}
async function createPost(title) {
    // console.log(author)
    const post = new Post({
        title: title,
        author: "64841c832b969e58bd5720b9",
        text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    });
    await post.save();
    console.log("Post created");

    return post;
}
async function createAuthor() {
    const blog_author = new BlogAuthor({
        user_name: "gibson",
        password: "password",
        first_name: "Gibson",
        last_name: "Gomes",
        description:
            "Nullam id lectus in ligula semper scelerisque in in mauris. Praesent gravida lorem vitae nisi tempor, non bibendum nulla dignissim. Donec a nunc semper, euismod urna molestie, dapibus dolor.",
        age: "01/01/1991",
    });
    await blog_author.save();
    console.log("Blog author created");

    return blog_author;
}
async function main() {
    const numbs = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];
    await mongoose.connect(mongoDB);
    // const author = await createAuthor();
    for (let num in numbs) {
        const post = await createPost("POST " + num);
        for (let num in numbs) {
            await createComment(post, "User " + num);
        }
    }
    mongoose.connection.close();
}
main().catch((err) => console.log(err));
