const mongoose = require('mongoose');

// create schema
let commentSchema = new mongoose.Schema({
    author: String
,   text: String
,   createdDate: {
        type: Date
    ,   default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
