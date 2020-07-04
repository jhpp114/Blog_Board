// Routes for Global
const express = require('express');
const passport = require('passport');
const User = require('../models/user');
let router = express.Router();

// =========================
// ===Basic Display Route===
// =========================
router.get('/', function(req, res) {
    res.render('welcome');
});

router.get('/blogs', function(req, res) {
    res.render('blogs');
});

// =========================
// ===User Authentication===
// =========================
// render register form
router.get('/register', (req, res) => {
    res.render('user/register');
});
// save user into database
router.post('/register', async function(req, res) {
    let new_user = new User({username: req.body.username});
    try {
        await User.register(new_user, req.body.password);
        await passport.authenticate("local");
        res.redirect('/blogs');
    } catch (error) {
        console.log("Oops error on registering user");
        console.log(error);
        res.redirect('/register');
    }
});
// login page
router.get('/login', function(req, res) {
    res.render('user/login');
});
// check if user is authenticate or not
router.post('/login', passport.authenticate("local", {
    successRedirect: '/blogs'
,   failureRedirect: "/login"
}));
// logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/blogs');
});

module.exports = router;
