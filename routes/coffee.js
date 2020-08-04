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

router.put('/blog/coffee/:id', async (req, res) => {
    let edit_data_id = req.params.id;
    let edit_data = req.body.coffee;
    try {
        await Coffee.findByIdAndUpdate(edit_data_id, edit_data);
        req.flash('success', "Successfully Edit the Blog Post");
        res.redirect('/blog/coffee/' + edit_data_id);
    } catch (error) {
        req.flash('error', "Error on Editing Data");
        res.redirect("back");
        console.log(error);
    }
    res.send("Hello Edit Coffee");
});

// delete post
router.delete('/blog/coffee/:id', async (req, res) => {
    try {
        await Coffee.findByIdAndRemove(req.params.id);
        req.flash("success", "Successfully Delete the Post");
        res.redirect('/blog/coffee/');
    } catch (error) {
        req.flash("error", "Error on Deleteing Data");
        res.redirect("back");
        console.log(error);
    }
});

module.exports = router;
