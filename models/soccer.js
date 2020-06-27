const mongoose = require('mongoose');

// ======soccerSchema========
// ======teamname=========
// ======image url========
// ======description======
let soccerSchema = new mongoose.Schema({
    teamname: String
,   image: String
,   description: String
});

module.exports = mongoose.model('Soccer', soccerSchema);
