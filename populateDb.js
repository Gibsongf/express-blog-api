require("dotenv").config();
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const BlogAuthor = require("./models/blog_author");
const Post = require("./models/posts");
const Comment = require("./models/comments");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;

async function main() {
    const id1 = "6495b2f0de6a6d4e9e2f205c";
    const id2 = "6495b357de6a6d4e9e2f205f";
    const id3 = "6495b398de6a6d4e9e2f2061";
    await mongoose.connect(mongoDB);
    await createFakeUserWithPostsAndComments(id1);
    await createFakeUserWithPostsAndComments(id2);
    await createFakeUserWithPostsAndComments(id3);

    mongoose.connection.close();
}
main().catch((err) => console.log(err));
// const fakeUser = {
//     user_name: `${faker.internet.userName()}`,
//     password: `${faker.internet.password()}`,
//     first_name: `${faker.person.firstName()}`,
//     last_name: `${faker.person.lastName()}`,
// };

const createFakeUserWithPostsAndComments = async (id) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const posts = [
        {
            title: capitalizeFirstLetter(faker.lorem.words()),
        },
        {
            title: capitalizeFirstLetter(faker.lorem.words()),
        },
        {
            title: capitalizeFirstLetter(faker.lorem.words()),
        },
    ];

    for (const post of posts) {
        const newPost = new Post({
            title: post.title,
            text: faker.lorem.paragraphs(3), // Generate random text for post
            author: id,
            published: true,
        });

        await newPost.save();
        console.log("Post created:", newPost);

        const numComments = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < numComments; i++) {
            const comment = new Comment({
                user_name: faker.internet.userName(),
                text: faker.lorem.sentence(), // Generate random text for comment
                post: newPost._id,
            });

            await comment.save();
            console.log("Comment created:", comment);
        }
    }
};
