const express = require('express');
const Coffee = require('../models/coffee');
const middlewareObj = require('../middleware/middleware');
const router = express.Router();

// display router post
router.get('/blog/coffee', async (req, res) => {
    try {
        const coffeeData = await Coffee.find({});
        res.render('coffee/coffee', {coffeeDatas:coffeeData});
    } catch (error) {
        console.log(error);
    }
});

// Post (add a blog data)
router.get('/blog/coffee/new', async (req, res) => {
    res.render("coffee/new");
}); 

module.exports = router;
