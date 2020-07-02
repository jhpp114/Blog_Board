const mongoose = require('mongoose');
const passport_mongoose = require('passport-local-mongoose');

// connect this to comment database so
// i can keep track which write user write comment
let userSchema = new mongoose.Schema({
    username: String
,   password: String
});

userSchema.plugin(passport_mongoose);

module.exports = mongoose.model('User', userSchema);
