// Todo: Move all the middleware to different location
// just call instead of having duplicate middleware
// ==========================
// ======Login Middleware====
// ==========================
let middlewares = {}; 

middlewares.isLoggedIn = function (req, res, next) {
    if (!req.user) {
        console.log("user is not logged in");
        res.redirect('/login');
    } else {
        next();
    }
}

middlewares.isSoccerAuthorize = async function (req, res, next) {
    if (!req.user) {
        console.log("User is not logged in");
        res.redirect('/login');
    } else {
        let foundSoccer = await Soccer.findById(req.params.id);
        if (foundSoccer.author.id.equals(req.user._id)) {
            console.log("You are authorized");
            next();
        } else {
            console.log("Login but not authorized");
            res.redirect('back');
        }
    }
}


middlewares.isAuthorize = async function(req, res, next) {
    if (!req.user) {
        console.log("You are not Login yet");
        res.redirect('/login');   
    } else {
        let foundComment = await Comment.findById(req.params.comment_id);
        if (foundComment.author.id.equals(req.user._id)) {
            console.log("Yes you are authoized!");
            next();
        } else {
            console.log("You are not authoized");
            res.redirect('back');
        }
    }
}

module.exports = middlewares;
