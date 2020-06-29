const mongoose = require('mongoose');

// Todo:
// Connect the comment to the soccer blog
let soccerSchema = new mongoose.Schema({
    teamname: String
,   image: String
,   description: String
,   comments: [
    {
        type: mongoose.Schema.Types.ObjectId
    ,   ref: "Comment"
    }
]
,   createdDate: {
        type: Date
    ,   default: Date.now
    }
});

module.exports = mongoose.model('Soccer', soccerSchema);
