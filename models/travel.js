const mongoose = require('mongoose');

let travelShema = new mongoose.Schema({
    placeName: String
,   image: String
,   description: String
,   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId
        ,    ref: "User"
        }
        ,
        username: String
    }
    ,
    comments: [{
        type: mongoose.Schema.Types.ObjectId
    ,   ref: "Comment"
    }]
    ,
    createDate: {
        type: Date
    ,   default: Date.now
    }
});

module.exports = mongoose.model('Travel', travelShema);
