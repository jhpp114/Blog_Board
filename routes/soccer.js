// Routes for Soccer
const express = require('express');
const Soccer = require('../models/soccer');
const Travel = require('../models/travel');
const Coffee = require('../models/coffee');
const middlewareObj = require('../middleware/middleware');
const fetch = require('node-fetch');
let router = express.Router();

// ===============
// ===Soccer======
// ===============
// display all soccer data

router.get('/blogs', async (req, res) => { 
    try {
        let soccer_recent = await Soccer.find({}).sort('-createdDate').limit(3);
        let travel_recent = await Travel.find({}).sort('-createDate').limit(3);
        let coffee_recent = await Coffee.find({}).sort('-createdDate').limit(3);
        res.render('blogs', {soccer_recent:soccer_recent, travel_recent:travel_recent, coffee_recent:coffee_recent});
    } catch (error) {
        console.log(error);
    }    
});

router.get('/blog/soccer', async function(req, res) {
    let dummyDataSoccer = await Soccer.find({});
    res.render('soccer/soccer', {dummySoccerTeams: dummyDataSoccer});
});

// display create soccer blog form
router.get('/blog/soccer/new', middlewareObj.isLoggedIn, function(req, res) {
    res.render('soccer/new');
});

// post the data sended from the form create
router.post('/blog/soccer', middlewareObj.isLoggedIn, async function(req, res) {
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
    req.flash("success", "Great! successfully Posted!");
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
router.get('/blog/soccer/:id/edit', middlewareObj.isSoccerAuthorize ,async function(req, res) {
    let editData = await Soccer.findById(req.params.id);
    res.render('soccer/edit', {editData: editData});
});
// submit editted data and save it into database
router.put('/blog/soccer/:id', middlewareObj.isSoccerAuthorize ,async function(req, res) {
    let editSubmittedData = req.body.soccer;
    await Soccer.findByIdAndUpdate(req.params.id, editSubmittedData);
    req.flash('success', "Successfully Editted the Blog post");
    res.redirect('/blog/soccer/' + req.params.id);
});
// delete the data
// Todo: Add middleware 
router.delete('/blog/soccer/:id/', middlewareObj.isSoccerAuthorize, async function(req, res) {
    let deleteItemId = req.params.id;
    await Soccer.findByIdAndRemove(deleteItemId);
    req.flash("success", "Successfully deleted the Blog post");
    res.redirect('/blog/soccer/');
});

module.exports = router;
