const express = require('express');
const Travel = require('../models/travel');
const middleware = require('../middleware/middleware');
const router = express.Router();

// Display Travel Posts
router.get('/blog/travel', async function(req, res) {
    let travelDatas = await Travel.find({});
    res.render('travel/travel.ejs', {travelDatas:travelDatas});
});

// render Post travel log
// added middleware
router.get('/blog/travel/new', middleware.isLoggedIn ,function(req, res) {
    res.render('travel/new');
});

// post travel log
// added middleware
router.post('/blog/travel', middleware.isLoggedIn, async function(req, res) {
    let placeData = req.body.travel.place;
    let placeImgData = req.body.travel.image;
    let placeDescription = req.body.travel.description;
    let author = {
        id: req.user._id
    ,   username: req.user.username
    };
    let createTravelData = {
        placeName: placeData
    ,   image: placeImgData
    ,   description: placeDescription
    ,   author: author
    };
    try {
        await Travel.create(createTravelData);
        req.flash("success", "Great! Successfully Posted");
        res.redirect('/blog/travel');
    } catch (error) {
        console.log(error);
    }
});

router.get('/blog/travel/:id', async function(req, res) {
    try {
        await Travel.findById(req.params.id).populate("comments").exec(function(error, foundData) {
            if (error) {
                req.flash('error', 'Error on Display Detail Data');
            }
            res.render('travel/detail', {foundData:foundData});
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
