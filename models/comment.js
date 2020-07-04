const mongoose = require('mongoose');

// create schema
let commentSchema = new mongoose.Schema({
    author: String
,   text: String
    // because comment will have only one user so no need array
,   author: {
        id: m
    }
,   createdDate: {
        type: Date
    ,   default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
