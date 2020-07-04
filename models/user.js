const mongoose = require('mongoose');
const passport_mongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    username: String
,   password: String
});

userSchema.plugin(passport_mongoose);

module.exports = mongoose.model('User', userSchema);
