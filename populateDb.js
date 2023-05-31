require("dotenv").config();

const BlogAuthor = require("./models/blog_author");
const Post = require("./models/posts");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;

// main().catch((err) => console.log(err));
// a new post function to be push to the author new model and add username password to the model

async function createPost(author) {
	const post = new Post({
		title: "Lorem ipsum dolor sit amet",
		author: author._id,
		text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
	});
	await post.save();
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
	return blog_author;
}
async function main() {
	await mongoose.connect(mongoDB);
	const author = await createAuthor();
	await createPost(author);
	mongoose.connection.close();
}
