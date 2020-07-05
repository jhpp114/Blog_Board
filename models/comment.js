const mongoose = require('mongoose');

// create schema
// connect user to comment so i can know which user wrote comment
let commentSchema = new mongoose.Schema({
    text: String
,   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId
        ,   ref: "User"
        }
    ,   username: String
    }
,   createdDate: {
        type: Date
    ,   default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
