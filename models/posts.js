const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// need a published or not boolean here
const PostSchema = new Schema({
	title: { type: String, require: true, minLength: 3 },
	author: { type: Schema.Types.ObjectId, ref: "Blog Author", require: true },
	text: { type: String, require: true, minLength: 10 },
	timestamp: { type: Date, default: Date.now },
	published:{type:Boolean, default:false}
});

PostSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	return `/post/${this._id}`;
});
module.exports = mongoose.model("Post", PostSchema);
