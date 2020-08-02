const express = require('express');
const Coffee = require('../models/coffee');
const middlewareObj = require('../middleware/middleware');
const coffee = require('../models/coffee');
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
router.get('/blog/coffee/new', middlewareObj.isLoggedIn ,async (req, res) => {
    res.render("coffee/new");
}); 

// Post the data into database
router.post('/blog/coffee', async (req, res) => {
    let coffeeData = req.body.coffee;
    let coffee_place = coffeeData.coffeename;
    let coffee_image = coffeeData.image;
    let coffee_description = coffeeData.description;
    let coffee_autor = {
        id: req.user._id
    ,   username: req.user.username
    };
    let coffeeData_set = {
        coffeename: coffee_place
    ,   image: coffee_image
    ,   description: coffee_description
    ,   author: coffee_autor
    };
    
    console.log(coffeeData_set);
    try {
        await Coffee.create(coffeeData_set);
        req.flash("success", "Great! successfully Posted!");
        res.redirect('/blog/coffee');
    } catch (error) {
        req.flash('error', "Fail to add Data into database");
        res.redirect("back");
        console.log(error);
    }
});

module.exports = router;
