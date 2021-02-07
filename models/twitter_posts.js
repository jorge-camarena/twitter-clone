const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    FullName: String,
    UserName: String,
    content: String,
    likes: String,
});

module.exports = mongoose.model('Post', PostSchema);