const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogAuthorSchema = new Schema({
	first_name: { type: String, maxLength: 25, require: true },
    last_name: { type: String, maxLength: 25},
    description:{type: String},
    age:{type: Date},
    posts:[{type: Schema.Types.ObjectId,ref:'Post'}],
});

BlogAuthorSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	return `/blog-author/${this._id}`;
    // the user of the api will need this to use as href at html stuff i think
});

// Virtual for author's full name
BlogAuthorSchema.virtual("name").get(function () {
    let fullName = "";
	if (this.fname && this.lname) {
		fullName = `${this.lname}, ${this.fname}`;
	}
	if (!this.fname || !this.lname) {
		fullName = "";
	}
	return fullName;
});
module.exports = mongoose.model('Blog Author',BlogAuthorSchema)