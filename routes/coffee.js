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

// Show Details
router.get('/blog/coffee/:id', async (req, res) => {
    try {
        await Coffee.findById(req.params.id).populate("comments").exec( (error, foundData) => {
            if (error) {
                req.flash("error", "Error on Display detail Data");
                console.log(error);
            }
            res.render('coffee/detail', {foundData:foundData});
        });
    } catch(error) {
        req.flash("error", "Fail to display details on this post");
        req.redirect('/blog/coffee');
        console.log(error)
    }
});

// edit page
router.get('/blog/coffee/:id/edit', async (req, res) => {
    let coffeeData_id = req.params.id;
    try {
        let editCoffeeData = await Coffee.findById(coffeeData_id); 
        res.render("coffee/edit", {editCoffeeData:editCoffeeData});   
    } catch (error) {
        console.log(error);
        req.flash("error", "Error on displaying Edit Page");
        res.redirect('back');
    }
});

module.exports = router;
