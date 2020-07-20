// Todo: Move all the middleware to different location
// just call instead of having duplicate middleware
// ==========================
// ======Login Middleware====
// ==========================
const Soccer = require('../models/soccer');
const Comment = require('../models/comment');
let middlewares = {}; 

middlewares.isLoggedIn = function (req, res, next) {
    if (!req.user) {
        req.flash("error", "You are not currently logged in. Please Login");
        res.redirect('/login');
    } else {
        next();
    }
}

middlewares.isSoccerAuthorize = async function (req, res, next) {
    if (!req.user) {
        console.log("User is not logged in");
        req.flash("error", "You are not currently logged in. Please Login");
        res.redirect('/login');
    } else {
        let foundSoccer = await Soccer.findById(req.params.id);
        if (foundSoccer.author.id.equals(req.user._id)) {
            req.flash("success", "Authorized");
            console.log("You are authorized");
            next();
        } else {
            req.flash("error", "You are not Authorized");
            res.redirect('back');
        }
    }
}

middlewares.isAuthorize = async function(req, res, next) {
    if (!req.user) {
        req.flash("error", "You are not currently logged in. Please Login");
        console.log("You are not Login yet");
        res.redirect('/login');   
    } else {
        let foundComment = await Comment.findById(req.params.comment_id);
        if (foundComment.author.id.equals(req.user._id)) {
            req.flash("success", "Authorized");
            console.log("Yes you are authoized!");
            next();
        } else {
            req.flash("error", "You are not Authorized");
            console.log("You are not authoized");
            res.redirect('back');
        }
    }
}

module.exports = middlewares;
