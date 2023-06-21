const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, require: true, minLength: 4 },
    author: { type: Schema.Types.ObjectId, ref: "Blog Author", require: true },
    text: { type: String, require: true, minLength: 10 },
    timestamp: { type: Date, default: Date.now },
    published: { type: Boolean, default: false },
});

module.exports = mongoose.model("Post", PostSchema);
