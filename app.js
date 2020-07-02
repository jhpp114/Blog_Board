// requires from npm
const express = require('express');
const { urlencoded } = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const PORT_NUMBER = 3000;
const app = express();
// const seedDb = require('./seed');
// // const seed = require('seed')

// seedDb();
// ==================
// ==Require Models==
// ==================
const Soccer = require('./models/soccer');
const Comment = require('./models/comment');
const User = require('./models/user');
// ==================
// =Database Connect=
// ==================
mongoose.connect('mongodb://localhost/my_blog_board', {
    useNewUrlParser: true
,   useUnifiedTopology: true
})
.then(() => console.log("DB Connected"))
.catch( (error) => console.log(`Error on connecting database ${error}`));
mongoose.set('useFindAndModify', false);

// app configure
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require('express-session') ({
    secret: "secret"
,   resave: false
,   saveUninitialized: false
}));
// passport configure
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ================
// ===ROUTE========
// ================
// welcome page
app.get('/', function(req, res) {
    res.render('welcome');
});

app.get('/blogs', function(req, res) {
    res.render('blogs');
});

// ===============
// ===Soccer======
// ===============
// display all soccer data
app.get('/blog/soccer', async function(req, res) {
    let dummyDataSoccer = await Soccer.find({});
    res.render('soccer/soccer', {dummySoccerTeams: dummyDataSoccer});
});

// display create soccer blog form
app.get('/blog/soccer/new', function(req, res) {
    res.render('soccer/new');
});

// post the data sended from the form create
app.post('/blog/soccer', async function(req, res) {
    let newPostData = req.body.soccer;
    await Soccer.create(newPostData);
    // await Soccer.save();
    // dummyDataSoccer.push(newPostData);
    res.redirect('/blog/soccer');
});
// get detail page and render it base on the pass id.
app.get('/blog/soccer/:id', function(req, res) {
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
app.get('/blog/soccer/:id/edit', async function(req, res) {
    let editData = await Soccer.findById(req.params.id);
    res.render('soccer/edit', {editData: editData});
});
// submit editted data and save it into database
app.put('/blog/soccer/:id', async function(req, res) {
    let editSubmittedData = req.body.soccer;
    await Soccer.findByIdAndUpdate(req.params.id, editSubmittedData);
    res.redirect('/blog/soccer/' + req.params.id);
});
// delete the data
app.delete('/blog/soccer/:id/', async function(req, res) {
    let deleteItemId = req.params.id;
    await Soccer.findByIdAndRemove(deleteItemId);
    res.redirect('/blog/soccer/');
    // so the data got deleted i guess
});


// ==========================
// =======Comments===========
// ==========================
// so how does url looks like?
// we want comments on the blog (soccer currently)
// /blog/soccer/:id/comment/new to create comment
app.get('/blog/soccer/:id/comment/new', async function(req, res) {
    let soccerIdPostCommentOn = req.params.id;
    let foundSoccer = await Soccer.findById(soccerIdPostCommentOn);
    res.render('comment/new', {foundSoccer:foundSoccer});
});
// create comment
app.post('/blog/soccer/:id/comment', async function(req, res) {
    let commentData = req.body.comment;
    let commentCreate = await Comment.create(commentData);
    console.log("comment created successfully");
    console.log(commentCreate);
    let foundSoccer = await Soccer.findById(req.params.id);
    foundSoccer.comments.push(commentCreate);
    console.log("pushed");
    await foundSoccer.save();
    // then save it on the soccer
    res.redirect('/blog/soccer/' + req.params.id);
});

// =========================
// ===User Authentication===
// =========================
// render register form
app.get('/register', (req, res) => {
    res.render('user/register');
});
// save user into database
app.post('/register', async function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    let new_user = new User({username: req.body.username});
    try {
        await User.register(new_user, req.body.password);
        await passport.authenticate("local");
        res.redirect('/blogs');
    } catch (error) {
        console.log("Oops error on registering user");
        console.log(error)
    }
    // ok..? sounds like it worked?
    // all these random hash is password
    // salt is like added random word to create hash more complicated
    // so it becomes safer
});

// Listen to the port
app.listen(PORT_NUMBER, function(req, res) {
    console.log(`BLOG BOARD APP RUNNING: ${PORT_NUMBER}`);
});
// i found stupid mistake.....
// i wrote use.... instead of get.. how stupid...
