const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	text: { type: String, maxLength: 25, require: true },
	userName: { type: String, require: true, maxLength: 15, minLength: 5 },
	timestamp: { type: Date, default: Date.now },
});
CommentSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	// return `/catalog/bookinstance/${this._id}`;
});
module.export = mongoose.model('Comment',CommentSchema)