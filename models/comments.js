const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	post:{ type: Schema.Types.ObjectId, ref: "Post", require: true },
	text: { type: String, minLength: 3, require: true },
	user_name: { type: String, require: true, minLength: 3, minLength: 4 },
	timestamp: { type: Date, default: Date.now },
});
CommentSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	// return `/catalog/bookinstance/${this._id}`;
});
module.exports = mongoose.model('Comment',CommentSchema)