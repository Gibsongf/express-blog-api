require('dotenv').config()

const BlogAuthor = require("./models/blog_author");
const Post = require("./models/posts");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;
main().catch((err) => console.log(err));

async function aNewAuthor(){
    const blog_author = new BlogAuthor({
        first_name:'Test',
        last_name: 'Author',
        description:'a test blog author',
        age:'01/01/1991'
    })
    await blog_author.save()
    
}
async function main() {
	await mongoose.connect(mongoDB);
    await aNewAuthor();
    mongoose.connection.close();

}
