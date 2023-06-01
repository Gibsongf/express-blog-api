require("dotenv").config();

const BlogAuthor = require("./models/blog_author");
const Post = require("./models/posts");
const Comment = require("./models/comments");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;

main().catch((err) => console.log(err));
// a new post function to be push to the author new model and add username password to the model
async function createComment(post){
	const comment = new Comment({
		user_name:'tempor incididun',
		text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		post:post._id
	})
	await comment.save()
	console.log("Comment created");

}
async function createPost(author) {
	// console.log(author)
	const post = new Post({
		title: "Lorem ipsum dolor sit amet",
		author: author._id,
		text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
	});
	await post.save();
	console.log("Post created");

	return post
}
async function createAuthor() {
	const blog_author = new BlogAuthor({
		user_name: "test",
		password: "password",
		first_name: "Test",
		last_name: "Author",
		description: "a test blog author",
		age: "01/01/1991",
	});
	await blog_author.save();
	console.log("Blog author created");

	return blog_author;
}
async function main() {
	await mongoose.connect(mongoDB);
	const author = await createAuthor();
	const post = await createPost(author);
	await createComment(post)
	mongoose.connection.close();
}
