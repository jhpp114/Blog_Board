// Routes for Soccer
const express = require('express');
const Soccer = require('../models/soccer');
let router = express.Router();

// ===============
// ===Soccer======
// ===============
// display all soccer data
router.get('/blog/soccer', async function(req, res) {
    let dummyDataSoccer = await Soccer.find({});
    res.render('soccer/soccer', {dummySoccerTeams: dummyDataSoccer});
});

// display create soccer blog form
router.get('/blog/soccer/new', isLoggedIn, function(req, res) {
    res.render('soccer/new');
});

// post the data sended from the form create
router.post('/blog/soccer', isLoggedIn, async function(req, res) {
    // let newPostData = req.body.soccer;
    let teamname = req.body.soccer.teamname;
    let image = req.body.soccer.image;
    let description = req.body.soccer.description;
    let author = {
        id: req.user._id
    ,   username: req.user.username
    };
    let createdSoccerData = {
        teamname: teamname
    ,   image: image
    ,   description: description
    ,   author: author
    }
    await Soccer.create(createdSoccerData);
    console.log("Data created Successfully");
    // await Soccer.save();
    // dummyDataSoccer.push(newPostData);
    res.redirect('/blog/soccer');
});
// get detail page and render it base on the pass id.
router.get('/blog/soccer/:id', function(req, res) {
    Soccer.findById(req.params.id).populate("comments").exec(function(error, foundData) {
        if (error) {
            console.log("Oops, fail to retrive data for detail page");
            console.log(error);
        } else {
            res.render('soccer/detail', {foundData: foundData});
        }
    });
});
// render edit form to user base on the data found
router.get('/blog/soccer/:id/edit', isAuthorize ,async function(req, res) {
    let editData = await Soccer.findById(req.params.id);
    res.render('soccer/edit', {editData: editData});
});
// submit editted data and save it into database
router.put('/blog/soccer/:id', isAuthorize ,async function(req, res) {
    let editSubmittedData = req.body.soccer;
    await Soccer.findByIdAndUpdate(req.params.id, editSubmittedData);
    res.redirect('/blog/soccer/' + req.params.id);
});
// delete the data
// Todo: Add middleware 
router.delete('/blog/soccer/:id/', isAuthorize, async function(req, res) {
    let deleteItemId = req.params.id;
    await Soccer.findByIdAndRemove(deleteItemId);
    res.redirect('/blog/soccer/');
    // so the data got deleted i guess
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

async function isAuthorize(req, res, next) {
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

module.exports = router;
