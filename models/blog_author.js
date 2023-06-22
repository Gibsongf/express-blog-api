const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogAuthorSchema = new Schema({
    user_name: { type: String, maxLength: 15, require: true },
    password: { type: String, require: true },
    first_name: { type: String, maxLength: 25, require: true },
    last_name: { type: String, maxLength: 25 },
    description: { type: String },
    age: { type: Date },
    // posts:[{type: Schema.Types.ObjectId,ref:'Post'}],
});

// Virtual for author's full name
BlogAuthorSchema.virtual("name").get(function () {
    let fullName = "";
    if (this.first_name && this.last_name) {
        fullName = `${this.first_name} ${this.last_name}`;
    }
    if (!this.last_name) {
        fullName = this.first_name
    }
    return fullName;
});
module.exports = mongoose.model("Blog Author", BlogAuthorSchema);
