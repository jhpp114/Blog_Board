// Routes for Comments
const express = require('express');
const Soccer = require('../models/soccer');
const Comment = require('../models/comment');
const comment = require('../models/comment');
let router = express.Router();

// ==========================
// =======Comments===========
// ==========================
router.get('/blog/soccer/:id/comment/new', isLoggedIn, async function(req, res) {
    let soccerIdPostCommentOn = req.params.id;
    let foundSoccer = await Soccer.findById(soccerIdPostCommentOn);
    res.render('comment/new', {foundSoccer:foundSoccer});
});
// create comment
router.post('/blog/soccer/:id/comment', isLoggedIn ,async function(req, res) {
    let commentData = req.body.comment;
    let commentCreate = await Comment.create(commentData);
    console.log("comment created successfully");
    console.log(commentCreate);
    let foundSoccer = await Soccer.findById(req.params.id);
    // before push comment inside Soccer
    // add user into comment
    commentCreate.author.id = req.user._id;
    commentCreate.author.username = req.user.username;
    await commentCreate.save();
    console.log("Comment Saved");
    foundSoccer.comments.push(commentCreate);
    console.log("pushed");
    await foundSoccer.save();
    // then save it on the soccer
    res.redirect('/blog/soccer/' + req.params.id);
});

// ==========================
// ======Login Middleware====
// ==========================
// Todo: Organize the middle ware after routes
function isLoggedIn(req, res, next) {
    if (!req.user) {
        console.log("user is not logged in");
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = router;
