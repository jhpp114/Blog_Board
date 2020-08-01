// Routes for Comments
const express = require('express');
const Soccer = require('../models/soccer');
const Comment = require('../models/comment');
const Travel = require('../models/travel');
const middlewareObj = require('../middleware/middleware');
let router = express.Router();

// ==========================
// =======Comments===========
// ==========================
router.get('/blog/soccer/:id/comment/new', middlewareObj.isLoggedIn, async function(req, res) {
    let soccerIdPostCommentOn = req.params.id;
    let foundSoccer = await Soccer.findById(soccerIdPostCommentOn);
    res.render('comment/new', {foundSoccer:foundSoccer});
});

router.get('/blog/travel/:id/comment/new', middlewareObj.isLoggedIn, async (req, res) => {
    let travelPostCommentOn = req.params.id;
    let foundTravel = await Travel.findById(travelPostCommentOn);
    res.render('comment/travelNew', {foundTravel:foundTravel});
});

// create comment
router.post('/blog/soccer/:id/comment', middlewareObj.isLoggedIn ,async function(req, res) {
    let foundSoccer = await Soccer.findById(req.params.id);
    let commentData = req.body.comment;
    let commentCreate = await Comment.create(commentData);
    console.log("comment created successfully");
    console.log(commentCreate);
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

router.post('/blog/travel/:id/comment', middlewareObj.isLoggedIn, async (req, res) => {
    let targetTravelId = req.params.id;
    let foundTravel = await Travel.findById(targetTravelId);
    let commentData = req.body.comment;
    let commentCreate = await Comment.create(commentData);
    commentCreate.author.id = req.user._id;
    commentCreate.author.username = req.user.username;
    await commentCreate.save();
    foundTravel.comments.push(commentCreate);
    await foundTravel.save();
    res.redirect('/blog/travel/' + targetTravelId);
});

// render edit page
router.get('/blog/soccer/:id/comment/:comment_id', middlewareObj.isAuthorize ,async function(req, res) {
    try {
        let foundComment = await Comment.findById(req.params.comment_id);
        let soccerId = req.params.id;
        res.render('comment/edit', {soccerId:soccerId, foundComment: foundComment});
    } catch (error) {
        console.log("Oops, fail to retrieve comment from database");
        console.log(error);
        res.redirect('back');
    }
});
// put method to store edited data into database
router.put('/blog/soccer/:id/comment/:comment_id', middlewareObj.isAuthorize ,async function(req, res) {
    try {
        let updateData = req.body.comment;
        let updateCommentId = req.params.comment_id;
        let edit_target_data = await Comment.findByIdAndUpdate(updateCommentId, updateData);
        // console.log(edit_target_data);
        req.flash("success", "Successfully added comment");
        res.redirect('/blog/soccer/' + req.params.id);
    } catch (error) {
        console.log("Oops error on saving updated comment data");
        console.log(error);
        req.flash("error", "Oops error on edit the comment");
        res.redirect('back');
    }

});
// delete the comment
router.delete('/blog/soccer/:id/comment/:comment_id', middlewareObj.isAuthorize ,async function(req, res) {
    // just delete comment without touching soccer should be ok.
    try {
        await Comment.findByIdAndDelete(req.params.comment_id);
        console.log("Delete Comment Success");
        req.flash("success", "Successfully Deleted comment");
        res.redirect('/blog/soccer/' + req.params.id);
    } catch (error) {
        console.log("Oops Error on deleting Comment");
        console.log(error);
        req.flash("error", "Oops error on Deleting the comment");
        res.redirect('back');
    }
    
});

module.exports = router;
