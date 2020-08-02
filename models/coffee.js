const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
    coffeename: String
,   image: String
,   description: String
,   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId
        ,   ref: "User"
        }
        ,
        username: String
    }
,   comments: [{
        type: mongoose.Schema.Types.ObjectId
    ,   ref: "Comment"
    }]
    ,
    createdDate: {
        type: Date
    ,   default: Date.now
    }
});

module.exports = new mongoose.model('Coffee', coffeeSchema);
