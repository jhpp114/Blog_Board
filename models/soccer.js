const mongoose = require('mongoose');

// Todo: Create Post Data 
// add it on to the database
// ======soccerSchema========
// ======teamname=========
// ======image url========
// ======description======
let soccerSchema = new mongoose.Schema({
    teamname: String
,   image: String
,   description: String
,   createdDate: {
        type: Date
    ,   default: Date.now
    }
});

module.exports = mongoose.model('Soccer', soccerSchema);
